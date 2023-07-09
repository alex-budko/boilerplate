from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import glob
import subprocess
import pexpect
from pexpect.popen_spawn import PopenSpawn

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

@app.before_first_request
def set_api_key():
    os.environ['OPENAI_API_KEY'] = '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'

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8'), process.returncode


@app.route('/generate', methods=['POST'])
def generate_code():
    #Keep it simple, press enter, type y, type y

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
            f.write(f"We need to make the following program: {text} and uses these frameworks: {', '.join(frameworks)}")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    child = PopenSpawn('gpt-engineer projects/boilerplate')
    child.sendline('anything works')
    child.sendline('y')
    child.sendline('y')

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
        ]
    })
