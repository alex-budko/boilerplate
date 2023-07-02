from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

@app.before_first_request
def set_api_key():
    os.environ['OPENAI_API_KEY'] = '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'

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
            f.write(f"We need to make a program that is {text} and uses these frameworks: {', '.join(frameworks)}")
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    os.system('gpt-engineer projects/boilerplate')
    # os.system('Keep it as simple as possible')

    return jsonify({
        'codeResults': [
            {
                'title': 'Completed Successfully',
                'code': f"We need to make a program that is {text} and uses these frameworks: {', '.join(frameworks)}"
            }
        ]
    })
