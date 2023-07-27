from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
import pexpect
from flask_socketio import SocketIO
from threading import Event
import logging
import re

logging.basicConfig(level=logging.DEBUG)

user_response_event = Event() 
user_response = None  

app = Flask(__name__)
cors = CORS(app, resources={r"/generate": {"origins": "*", "methods": ["POST"], "allow_headers": ["Content-Type"]}})
app.config['DEBUG'] = True
socketio = SocketIO(app, cors_allowed_origins="*")

active_child = None

@app.before_first_request
def set_api_key():
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

    try:
        with open('projects/{project_name}/prompt', 'w') as f:
            f.write(
                f"We have the following request for a program: '{text}' and we want to use these frameworks: {', '.join(frameworks)}")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    active_child = pexpect.spawn(f'gpt-engineer projects/{project_name}')

    output_buffer = ""
    buffer_count = 0
    first_question_ended = False

    while active_child.isalive():
        try:
            active_child.expect('\n', timeout=None)
            line = active_child.before.decode('utf-8').strip()

            logging.debug('Output from child process: ' + line)

            # Add the line to the buffer
            output_buffer += line + "\n"

            # If the line starts with a number followed by a period and a space, it's a sub-question
            if re.match(r'^\d+\.', line):
                buffer_count += 1

            # If the line is the ending line of the first question, set the flag
            if line == '(answer in text, or "c" to move on)':
                first_question_ended = True

            # If the buffer count reaches 10, the first question ended, or the line is another question,
            # emit the buffered output as a single message and clear the buffer
            if buffer_count == 10 or \
                first_question_ended or \
                line.startswith('Did the generated code run at all?') or \
                line.startswith('Did the generated code do everything you wanted?'):
                logging.debug('Output Buffer: ' + output_buffer)
                socketio.emit('question_prompt', {'output': output_buffer.strip()})
                output_buffer = ""
                buffer_count = 0
                first_question_ended = False  # Reset the flag for the next first question

                user_response_event.wait()  # Wait for the event to be set
                user_response_event.clear()  # Reset the event for the next iteration

                active_child.sendline(user_response)  # Send the user's answer to the child process
        except pexpect.exceptions.EOF:
            break
        except Exception as e:
            logging.error('Error in child process handling: ' + str(e))

    # If there is still output in the buffer when the process ends, emit it
    if output_buffer:
        socketio.emit('question_prompt', {'output': output_buffer.strip()})

    active_child.wait()

    file_data = []
    for file in glob.glob(f'projects/{project_name}/workspace/*'):
        with open(file, 'r') as f:
            file_data.append({
                'filename': os.path.basename(file),
                'content': f.read(),
            })

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