from flask import Flask, request
from database import create_account, user_authenticate, get_isp
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


@app.route("/api/get-isp-data/", methods=["GET"])
def get_isp_data():
    if request.method == "GET":
        data = get_isp()
        _data_ = {}
        for i in data:
            _data_[i[0]] = json.loads(i[1])
        return _data_




if __name__== "__main__":
    app.run(debug=True)