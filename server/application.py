from flask import Flask, jsonify,request
import sqlalchemy
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

engine = sqlalchemy.create_engine("postgresql://admin:admin@192.168.0.247/kgaps")
conn = engine.connect()


# Define a route to fetch data from MySQL
@app.route('/', methods=['POST', 'GET'])
def index():
    data={'error':'none'}
    if request.method=='POST':
        data=request.json['role']
    # q = sqlalchemy.text("SELECT * FROM users;")
    # r = conn.execute(q).fetchall()
    # data=[dict(i._mapping) for i in r]
    return json.dumps(data)

@app.route('/login', methods=['POST', 'GET'])
def mentor_login():
    role=request.json['role']
    name=request.json['name']
    password=request.json['password']
    q = sqlalchemy.text(f"SELECT * FROM users WHERE name='{name}' and password='{password}' and role={role};")
    r = conn.execute(q).fetchall()
    if r:
        data=[dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data[0])
    else:
        return json.dumps({'Error':'Incorrect details entered'})

@app.route('/register', methods=['POST', 'GET'])
def coordinator_login():
    data="coordinator logged in"
    return data

@app.route('/dm_login', methods=['POST', 'GET'])
def dm_login():
    data="domain mentor logged in"
    return data

@app.route('/admin_login', methods=['POST', 'GET'])
def admin_login():
    data="admin logged in"
    return data



