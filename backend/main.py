from flask import Flask, request
from database import create_account, user_authenticate, get_isp, store_recharge, get_recharge_table
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


@app.route("/api/rechargedetails/", methods=["post"])
def api_store_recharge():
    if request.method == "POST":
        data = json.loads(request.get_data())
        supp_nigga = store_recharge(data)
        if supp_nigga == True:
            return {'date store': "successful", "status": "ok", "status_code": 200}
        else:
            return {'date store': "failed", "status": "error", "status_code": 500}

    else :
        return {"status": "forbidden", "status_code": 403, "reason": "only post is allowed"}


@app.route("/api/get-recharge-details/", methods=["GET"])
def api_get_recharge_details():
    if request.method == "GET":
        data  = get_recharge_table()
        return data
    else :
        return {"status": "forbidden", "status_code": 403, "reason": "only post is allowed"} 


if __name__== "__main__":
    app.run(debug=True)