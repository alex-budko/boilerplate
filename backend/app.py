from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
import pexpect
from flask_socketio import SocketIO
from threading import Event
import logging
import uuid
from datetime import datetime
import shutil
import re

logging.basicConfig(level=logging.DEBUG)

user_response_event = Event() 
user_response = None  

app = Flask(__name__)
cors = CORS(app, resources={r"/generate": {"origins": "*", "methods": ["POST"], "allow_headers": ["Content-Type"]}})
app.config['DEBUG'] = True
socketio = SocketIO(app, cors_allowed_origins="*")

active_child = None


with app.app_context():
    os.environ['OPENAI_API_KEY'] = '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'
    os.environ['COLLECT_LEARNINGS_OPT_OUT']= 'true'

def run_command(command):
    process = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8'), process.returncode

@app.route('/generate', methods=['POST'])
def generate_code():
    global active_child, user_response_event, user_response
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Invalid JSON data received"}), 400

    text = data.get('text')
    frameworks = data.get('frameworks')
    project_name = data.get('projectName')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    if not frameworks:
        frameworks = []

    # Append a timestamp or a uuid to the project name to make it unique
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    unique_id = str(uuid.uuid4())
    project_dir = f'projects/{project_name}_{timestamp}_{unique_id}'

    os.makedirs(project_dir, exist_ok=True)

    try:
        with open(f'{project_dir}/prompt', 'w') as f:
            f.write(
                f"We have the following request for a program: '{text}' and we want to use these frameworks: {', '.join(frameworks)}")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    original_dir = os.getcwd()
    os.chdir(project_dir)
    active_child = pexpect.spawn(f'gpt-engineer .')
    os.chdir(original_dir) 

    output_buffer = ""
    first_question_ended = False
    collect_buffer = True
    step = 0
    first_question = True

    while active_child.isalive():
        try:
            active_child.expect('\n', timeout=None)
            line = active_child.before.decode('utf-8').strip()
            socketio.emit('terminal_output', {'step': step})

            logging.debug('Output from child process: ' + line)

            step += 1

            # Add the line to the buffer if collect_buffer is True or the line contains a number
            if collect_buffer and not line.startswith(('INFO:', 'Model', 'error_code=')) and re.search(r'\d', line):
                output_buffer += line + "\n"               

            # Check if the line is the beginning line of a question
            if line.startswith('Areas that need clarification:') or line.startswith('remaining questions'):
                output_buffer += line + "\n"
                collect_buffer = True

            # Check if the line is the ending line of a question
            if line in ['(answer in text, or "c" to move on)']:
                first_question_ended = True

            if (not first_question) and ('Did the generated code' in line or 'gpt-engineer' in line or 'Do you want to execute this code?' in line):
                print("SENDING Y")
                active_child.sendline('y')

            elif first_question_ended:
                if first_question:
                    answers = []
                    logging.debug('Output Buffer: ' + output_buffer)
                    questions_list = re.split(r'(\d\.\s)', output_buffer)  # Split based on numbered questions
                    print(questions_list)
                    for i in range(1, len(questions_list), 2):  # Iterate over the questions
                        question = questions_list[i] + questions_list[i + 1]  # Combine question number and content
                        if not "answer in text" in question:
                            socketio.emit('question_prompt', {'output': question.strip()})
                            user_response_event.wait()  # Wait for the event to be set
                            user_response_event.clear()  # Reset the event for the next iteration
                            answers.append(user_response)
                    
                    combined_answers = "\n".join([f"{idx+1}) {answer}" for idx, answer in enumerate(answers)])
                    active_child.sendline(combined_answers)

                    first_question = not first_question
                    output_buffer = ""
                    first_question_ended = False
                    collect_buffer = False
                # else:
                #     output_buffer += line + "\n"

                #     logging.debug('Output Buffer: ' + output_buffer)
                #     socketio.emit('question_prompt', {'output': output_buffer.strip()})
                #     output_buffer = ""
                #     first_question_ended = False  # Reset the flag for the next question
                #     collect_buffer = False  # Reset the flag for the next question

                #     user_response_event.wait()  # Wait for the event to be set
                #     user_response_event.clear()  # Reset the event for the next iteration

                #     active_child.sendline(user_response)  # Send the user's answer to the child process
        except pexpect.exceptions.EOF:
            break
        except Exception as e:
            logging.error('Error in child process handling: ' + str(e))

    if output_buffer:
        socketio.emit('question_prompt', {'output': output_buffer.strip()})

    active_child.wait()

    file_data = []
    for root, _, files in os.walk(f'{project_dir}/workspace'):
        for file in files:
            with open(os.path.join(root, file), 'r') as f:
                file_data.append({
                    'filename': os.path.relpath(os.path.join(root, file), f'{project_dir}/workspace'),
                    'content': f.read(),
                })

    shutil.rmtree(project_dir)

    return jsonify({
        'codeResults': [
            {
                'title': 'Completed Successfully',
                'files': file_data
            }
        ],
    })

@socketio.on('user_response')
def handle_response(data):
    global active_child, user_response, user_response_event
    user_response = data.get('response')
    if user_response and active_child:
        active_child.sendline(user_response)
        user_response_event.set() 

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)