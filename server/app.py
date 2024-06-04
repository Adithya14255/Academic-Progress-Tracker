from flask import Flask,request,session
import sqlalchemy
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key="helloworld"
engine = sqlalchemy.create_engine("postgresql://admin:admin@172.16.45.117/kgaps")
conn = engine.connect()


# Define a route to fetch data from MySQL
@app.route('/', methods=['POST', 'GET'])
def index():
    data={'error':'none'}
    return json.dumps(data)

@app.route('/login', methods=['POST', 'GET'])
def mentor_login():
    if request.method=='POST':
        role=request.json['role']
        name=request.json['name']
        password=request.json['password']
        q = sqlalchemy.text(f"SELECT id,name,role,department_id FROM users WHERE name='{name}' and password='{password}' and role={role};")
        r = conn.execute(q).fetchall()
        if r:
            data=[dict(i._mapping) for i in r]
            print(data)
            session['id']=data[0]['id']
            session['name']=data[0]['name']
            return json.dumps(data[0])
        else:
            return json.dumps({'Error':'Incorrect details entered'})

@app.route('/register', methods=['POST', 'GET'])
def coordinator_login():
       if request.method=='POST':
        role=request.json['role']
        name=request.json['name']
        password=request.json['password']
        dept_id=request.json['department_id']
        id=request.json['id']
        q = sqlalchemy.text(f"INSERT INTO users VALUES({id},'{name}',{role},'{password}',{dept_id});")
        conn.execute(q)
        conn.commit()
        return json.dumps({'data':'Success'})

@app.route('/dm_login', methods=['POST', 'GET'])
def dm_login():
    data="domain mentor logged in"
    return data

@app.route('/admin_login', methods=['POST', 'GET'])
def admin_login():
    data="admin logged in"
    return data



if __name__ == '__main__':
    app.run(debug=True, port=5001,host="0.0.0.0")
