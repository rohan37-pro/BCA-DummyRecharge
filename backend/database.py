import sqlite3
import hashlib
from datetime import datetime

"""
create table user
(
    email varchar(256) unique not null,
    passhash varchar(1024)
);
create table isp
(
	name varchar(10) primary key,
	recharges varchar(1000)
);
create table recharges (
    email varchar(256),
    phone varchar(10),
    isp varchar(10),
    plan varchar(10),
    datetime varchar(30)
);
"""

update_code = """update isp
set recharges = '{
	"1" : {
	"charge": 13,
	"data" : "2 GB",
	"validity" : "1 Day"
	},
	"2" : {
	"charge": 197,
	"data" : "2 GB/Day",
	"validity" : "70 Days"
	},
	"3" : {
	"charge": 397,
	"data" : "2 GB/Day",
	"validity" : "150 Days"
	},
	"4" : {
	"charge": 139,
	"data" : "1.5 GB/Day",
	"validity" : "28 Days"
	},
	"5" : {
	"charge": 198,
	"data" : "2 GB/Day",
	"validity" : "48 Days"
	}
}'
where name='BSNL';"""


def create_account(data):
    email = data["email"]
    password = data["password"]
    passhash = hashlib.sha256(password.encode()).hexdigest()
    print(passhash)
    conn , db_cur = conectDB()
    db_cur.execute(f"select email from user where email='{email}';")
    fetched_data =db_cur.fetchall()
    if len(fetched_data) == 0:
        db_cur.execute(f"insert into user (email, passhash) values ('{email}','{passhash}') ")
        conn.commit()
        db_cur.close()
        conn.close()
        return { "account-create" : True, "email": email}
    else : 
        return { "account-create" : False, "reason": "Account already exists !!"}


def user_authenticate(data):
    email = data["email"]
    password = data["password"]
    passhash = hashlib.sha256(password.encode()).hexdigest()
    print(passhash)
    conn , db_cur = conectDB()
    db_cur.execute(f"select email, passhash from user where email='{email}';")
    fetched_data =db_cur.fetchall()
    if len(fetched_data)==1:
        if fetched_data[0][1] == passhash:
            return { "account-create" : True, "email": email}
        else:
            return { "account-create" : False, "reason": "wrong username or password !!"}
    else :
        return { "account-create" : False, "reason": "Account not found !!"}


def get_isp():
    conn , db_cur = conectDB()
    db_cur.execute(f"select name, recharges from isp;")
    fetched_data =db_cur.fetchall()
    return fetched_data

def store_recharge(data):
    email = data["email"]
    phone = data["recharge"]["phone"]
    isp = data["recharge"]["isp"]
    plan = data["recharge"]["plan"]
    time_stamp = datetime.now().strftime("%d/%m/%Y %H:%M")
    print(time_stamp)
    conn , db_cur = conectDB()
    db_cur.execute(f"insert into recharges (email, phone, isp, plan, datetime) values ('{email}', '{phone}', '{isp}', '{plan}', '{time_stamp}');")
    conn.commit()
    db_cur.close()
    conn.close()
    return True

def get_recharge_table():
    conn , db_cur = conectDB()
    db_cur.execute("select email, phone, isp, plan, datetime from recharges")
    raw_data = db_cur.fetchall()
    data = {}
    # {
    #     1 : {
    #         'email': 'jio@'
    #         'phone' : 1243
    #         'isp': 'jio'
    #         'plan' : 1234
    #         datetime : '234'
    #     }
    # }
    for i in range(len(raw_data)):
        data[i] = {}
        data[i]['email'] = raw_data[i][0]
        data[i]['phone'] = raw_data[i][1]
        data[i]['isp'] = raw_data[i][2]
        data[i]['plan'] = raw_data[i][3]
        data[i]['datetime'] = raw_data[i][4]
    return data


def conectDB():
    conn = sqlite3.connect("./Database/database.sqlite3")
    db_cur = conn.cursor()
    return conn, db_cur


insert_code = """insert into isp (name)
values ("Jio"),
("Airtel"),
("BSNL"),
("Vodafone");"""

create_code = """create table recharges (
    email varchar(256),
    phone varchar(10),
    isp varchar(10),
    plan varchar(10),
    datetime varchar(30)
);"""




if __name__ == "__main__":

    conn , db_cur = conectDB()
    db_cur.execute(create_code)
    conn.commit()
    db_cur.close()
    conn.close()