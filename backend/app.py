from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
from pexpect.popen_spawn import PopenSpawn
import time

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

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
    try:
        open('backend/projects/boilerplate/prompt', 'w').close()
    except Exception as e:
        print("Error here:", e)

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

    child = PopenSpawn('gpt-engineer projects/boilerplate')

    response = """I want to design an application that centers around user needs, 
        providing an intuitive and seamless experience across all platforms. Ensuring 
        optimal performance, reliability, maintainability, and scalability will be the
        key focus, with a strong commitment to data security and privacy. Emphasis 
        will be placed on handling unexpected situations gracefully and incorporating
        user feedback for continuous improvement. The development process will follow
        modern best practices, allowing for iterative enhancements to ensure a high-quality output."""

    terminal_output = []
    while child.isalive():
        line = child.readline().strip().decode('utf-8')
        if line:
            if line.endswith('?'):
                emit_question_prompt(line)
            else:
                terminal_output.append(line)

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

def emit_question_prompt(prompt):
    from flask_socketio import emit

    emit('question_prompt', {'prompt': prompt}, namespace='/questions')
    user_response = socketio.wait_for_event('user_response', namespace='/questions')
    child.sendline(user_response)
