from flask import Flask,request,session,jsonify
import sqlalchemy
import os
import json
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)
app.secret_key="helloworld"
engine = sqlalchemy.create_engine("postgresql://admin:admin@192.168.0.248/kgaps")
conn = engine.connect()


# Define a route to fetch data from MySQL
@app.route('/', methods=['POST', 'GET'])
def index():
    data={'error':'none'}
    return json.dumps(data)

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method=='POST':
        role=request.json['role']
        name=request.json['name']
        password=request.json['password']
        q = sqlalchemy.text(f"SELECT uid,name,role_id,department_id FROM user_details_check WHERE name='{name}' and password='{password}' and role_id={role};")
        r = conn.execute(q).fetchall()
        if r:
            data=[dict(i._mapping) for i in r]
            print(data)
            response=jsonify(data[0])
            return response
        else:
            return json.dumps({'Error':'Incorrect details entered'})

@app.route('/register', methods=['POST', 'GET'])
def register():
       if request.method=='POST':
        role=request.json['role']
        name=request.json['name']
        password=request.json['password']
        dept_id=request.json['department_id']
        id=request.json['id']
        q = sqlalchemy.text(f"INSERT INTO t_users VALUES({id},'{name}','{password}',{dept_id});")
        conn.execute(q)
        q = sqlalchemy.text(f"INSERT INTO l_role_user VALUES({id},{role});")
        conn.execute(q)
        conn.commit()
        return json.dumps({'data':'Success'})

@app.route('/faculty/<int:uid>', methods=['POST', 'GET'])
def faculty(uid):
    q = sqlalchemy.text(f"SELECT * FROM faculty_table WHERE uid='{uid}' and status_code!=4;")
    r = conn.execute(q).fetchall()
    if r:
        data=[dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)
        
@app.route('/course_mentor/<int:id>', methods=['POST', 'GET'])
def course_mentor(id):
        q = sqlalchemy.text(f"SELECT * FROM course_mentor_table WHERE mentor_id={id};")
        r = conn.execute(q).fetchall()
        if r:
            data=[dict(i._mapping) for i in r]
            print(data)
            return json.dumps(data)
        
@app.route('/domain_mentor/<int:id>', methods=['POST', 'GET'])
def domain_mentor(id):
        q = sqlalchemy.text(f"SELECT * FROM domain_mentor_table;")
        r = conn.execute(q).fetchall()
        if r:
            data=[dict(i._mapping) for i in r]
            print(data)
            return json.dumps(data)

@app.route('/courses', methods=['POST', 'GET'])
def courses():
        dept_id = request.json['department_id']
        q = sqlalchemy.text(f"Select c.course_code,c.course_name from t_course_details c,l_course_departments l where c.course_code=l.course_code and l.department_id='{dept_id}';")
        r = conn.execute(q).fetchall()
        data=[dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)

@app.route('/add_course', methods=['POST', 'GET'])
def add_course():
       if request.method=='POST':
        course_code = request.json['course_code']
        course_name = request.json['course_name']
        dept_id = request.json['department_id']
        q = sqlalchemy.text(f"INSERT INTO t_course_details VALUES('{course_code}','{course_name}');")
        conn.execute(q)
        q = sqlalchemy.text(f"INSERT INTO l_course_departments VALUES('{course_code}',{dept_id});")
        conn.execute(q)
        conn.commit()
        return json.dumps({'data':'Success'})

@app.route('/add_topic', methods=['POST', 'GET'])
def add_topic():
       if request.method=='POST':
            course_code = request.json['course_code']
            topic =request.json['topic']
            topic_id =request.json['topic_id']
            outcome = request.json['outcome']
            total_hours = request.json['total_hours']
            q = sqlalchemy.text(f"INSERT INTO t_course_topics VALUES('{course_code}','{outcome}','{topic}',{topic_id},{total_hours});")
            conn.execute(q)
            conn.commit()
            return json.dumps({'data':'Success'})

@app.route('/assign_course', methods=['POST', 'GET'])
def assign_course():
       if request.method=='POST':
            course_code = request.json['course_code']
            uid=request.json['uid']
            if (conn.execute(sqlalchemy.text(f"Select * from course_mentor_table where course_code='{course_code}' and uid={uid}")).all()):
                 return jsonify({'error':'mentor is already assigned to that course'})
            q = sqlalchemy.text(f"INSERT INTO t_complete_status (hours_completed, topic_id, handler_id, course_code, status_code) \
                                SELECT 0, topic_id, {uid}, '{course_code}', 0 \
                                FROM t_course_topics \
                                WHERE course_code = '{course_code}';")
            conn.execute(q)
            q = sqlalchemy.text(f"INSERT INTO t_topic_links \
                                    SELECT topic_id, {uid},''\
                                    FROM t_course_topics\
                                    WHERE course_code = '{course_code}';")
            conn.execute(q)
            q = sqlalchemy.text(f"INSERT INTO t_topic_comments \
                                    SELECT topic_id, {uid},''\
                                    FROM t_course_topics\
                                    WHERE course_code = '{course_code}';")
            conn.execute(q)
            conn.commit()
            return json.dumps({'data':'Success'})
       
if __name__ == '__main__':
    app.run(debug=True, port=5001,host="0.0.0.0")
