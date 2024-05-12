from flask import Flask, jsonify
import sqlalchemy
import os

app = Flask(__name__)


engine = sqlalchemy.create_engine(os.environ['DATABASE_URL'])
conn = engine.connect()


# Define a route to fetch data from MySQL
@app.route('/', methods=['POST', 'GET'])
def index():
    #q = sqlalchemy.text("SELECT * FROM course_coordinator")
    #r = conn.execute(q).fetchall()
    #data=[dict(i._mapping) for i in r]
    data="hi"
    return data

@app.route('/mentor_login', methods=['POST', 'GET'])
def mentor_login():
    data="mentor logged in"
    return data

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



