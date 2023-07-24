from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
import pexpect
from flask_socketio import SocketIO
from threading import Event

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

def run_command(command):
    process = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8'), process.returncode

@app.route('/generate', methods=['POST'])
def generate_code():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "Invalid JSON data received"}), 400

    text = data.get('text')
    frameworks = data.get('frameworks')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    if not frameworks:
        frameworks = []

    try:
        with open('projects/boilerplate/prompt', 'w') as f:
            f.write(
                f"We have the following request for a program: '{text}' and we want to use these frameworks: {', '.join(frameworks)}")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    global active_child, user_response_event, user_response
    active_child = pexpect.spawn('gpt-engineer projects/boilerplate')

    output_buffer = ""
    while active_child.isalive():
        print('HERE 1')
        try:
            print('HERE 2')
            active_child.expect('\n', timeout=None)
            line = active_child.before.decode('utf-8').strip()

            print('HERE 3')
            
            # Add the line to the buffer
            output_buffer += line + "\n"
            
            # If the line ends with ')', emit the buffered output as a single message and clear the buffer
            if line.endswith(')'):
                print('HERE 4')
                socketio.emit('question_prompt', {'output': output_buffer.strip()})
                output_buffer = ""

                print('HERE 5')
                user_response_event.wait()  # Wait for the event to be set
                user_response_event.clear()  # Reset the event for the next iteration
                
                active_child.sendline(user_response)  # Send the user's answer to the child process
        except pexpect.exceptions.EOF:
            break

    # If there is still output in the buffer when the process ends, emit it
    if output_buffer:
        socketio.emit('question_prompt', {'output': output_buffer.strip()})

    active_child.wait()

    file_data = []
    for file in glob.glob('projects/boilerplate/workspace/*'):
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
        user_response_event.set()  # Set the event to signal that the user's response is ready

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)
