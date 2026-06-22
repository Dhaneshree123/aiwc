# from flask import Flask, render_template, request, jsonify
# import requests

# app = Flask(__name__)

# # 👇 Your ngrok URL
# COLAB_API = "https://unsold-sternness-polka.ngrok-free.dev/generate"

# # Home route
# @app.route("/")
# def home():
#     return render_template("index.html")

# @app.route("/generate", methods=["POST"])
# def generate():
#     data = request.get_json()
#     if not data or "prompt" not in data:
#         return jsonify({"error": "Missing prompt in request"}), 400
        
#     prompt = data.get("prompt")

#     try:
#         # Forward the prompt to your Google Colab endpoint
#         response = requests.post(COLAB_API, json={"prompt": prompt}, timeout=60)
        
#         print("STATUS CODE FROM COLAB:", response.status_code)
        
#         # Check if the external API returned an error (like 404 or 405)
#         if response.status_code != 200:
#             print("ERROR RESPONSE TEXT:", response.text)
#             return jsonify({
#                 "error": f"Colab server returned status {response.status_code}",
#                 "details": response.text[:200]  # First 200 characters of error
#             }), response.status_code

#         # Attempt to decode JSON safely
#         return jsonify(response.json())

#     except requests.exceptions.Timeout:
#         return jsonify({"error": "The request to Google Colab timed out."}), 504
#     except requests.exceptions.ConnectionError:
#         return jsonify({"error": "Could not connect to the Google Colab ngrok tunnel. Is it running?"}), 502
#     except Exception as e:
#         print("Unexpected error:", str(e))
#         return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

# # Run app
# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Try adding a trailing slash if the original failed, or keep it exact.
# 👇 Double check this matches your exact Colab endpoint rule
COLAB_API = "https://stagnant-tapered-congrats.ngrok-free.dev/generate"  

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "Missing prompt in request"}), 400
        
    prompt = data.get("prompt")

    try:
        headers = {"ngrok-skip-browser-warning": "true"}
        
        # We pass json=data directly, forwarding the prompt cleanly
        response = requests.post(COLAB_API, json={"prompt": prompt}, headers=headers, timeout=90)
        
        print("STATUS CODE FROM COLAB:", response.status_code)
        
        if response.status_code != 200:
            print("ERROR RESPONSE TEXT:", response.text)
            return jsonify({
                "error": f"Colab server returned status {response.status_code}",
                "details": response.text[:200]
            }), response.status_code

        colab_json = response.json()
        return jsonify(colab_json)

    except Exception as e:
        print("Unexpected error:", str(e))
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)