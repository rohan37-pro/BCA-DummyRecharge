import sqlite3
import hashlib

"""
create table user
(
    email varchar(256) unique not null,
    passhash varchar(1024)
);
create table isp
(
	name varchar(10),
	recharges varchar(20)
);
"""


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

insert_code = """insert into isp (name)
values ("Jio"),
("Airtel"),
("BSNL"),
("Vodafone");"""

create_code = """create table isp
(
	name varchar(10) primary key,
	recharges varchar(1000)
);"""

def conectDB():
    conn = sqlite3.connect("./Database/database.sqlite3")
    db_cur = conn.cursor()
    return conn, db_cur

conn , db_cur = conectDB()
db_cur.execute(update_code)
conn.commit()
db_cur.close()
conn.close()