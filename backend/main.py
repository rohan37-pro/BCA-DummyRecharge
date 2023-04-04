from flask import Flask, request
from database import create_account, user_authenticate
import json
app = Flask(__name__)


@app.route("/api/create-account/", methods=["POST"])
def api_createAccount():
    if request.method == "POST":
        data = json.loads(request.get_data().decode('utf-8'))
        response = create_account(data)
        return response
    else:
        return {"account-create": False, "reason": "GET request is not accepted"}

@app.route("/api/user-authentication/", methods=["POST"])
def authentication():
    if request.method == "POST":
        data = json.loads(request.get_data().decode('utf-8'))
        response = user_authenticate(data)
        return response
    else:
        return {"account-create": False, "reason": "GET request is not accepted"}






if __name__== "__main__":
    app.run(debug=True)