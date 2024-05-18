from flask import Flask, jsonify
import sqlalchemy
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

engine = sqlalchemy.create_engine("postgresql://admin:admin@172.16.44.236/kgaps")
conn = engine.connect()


# Define a route to fetch data from MySQL
@app.route('/', methods=['POST', 'GET'])
def index():
    q = sqlalchemy.text("SELECT * FROM users;")
    r = conn.execute(q).fetchall()
    data=[dict(i._mapping) for i in r]
    return json.dumps(data)

@app.route('/mentor_login', methods=['POST', 'GET'])
def mentor_login():
    data={"data":"mentor logged in"}
    return json.dumps(data)

@app.route('/coordinator_login', methods=['POST', 'GET'])
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



