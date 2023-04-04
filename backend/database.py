import sqlite3
import hashlib

"""
create table user
(
    email varchar(256) unique not null,
    passhash varchar(1024)
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



def conectDB():
    conn = sqlite3.connect("./Database/database.sqlite3")
    db_cur = conn.cursor()
    return conn, db_cur
