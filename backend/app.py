from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
import pexpect
from flask_socketio import SocketIO, emit

app = Flask(__name__)
cors = CORS(app, resources={r"/generate": {"origins": "*", "methods": ["POST"], "allow_headers": ["Content-Type"]}})
app.config['DEBUG'] = True
socketio = SocketIO(app, cors_allowed_origins="*")

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

    child = pexpect.spawn('gpt-engineer projects/boilerplate')
    terminal_output = []
    
    while child.isalive():
        try:
            child.expect('\n', timeout=None)
            line = child.before.decode('utf-8').strip()
            if line:
                if line.endswith('?'):
                    emit_question_prompt(line, child)
                else:
                    terminal_output.append(line)
        except pexpect.exceptions.EOF:
            break

    child.wait()

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
        'terminalOutput': terminal_output
    })

def emit_question_prompt(prompt, child):
    @socketio.on('user_response')
    def handle_response(data):
        user_response = data.get('response')
        if user_response:
            child.sendline(user_response)

    socketio.emit('question_prompt', {'prompt': prompt})

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)