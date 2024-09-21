from flask import Flask, request, session, jsonify
import sqlalchemy
import os
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.secret_key = "helloworld"
engine = sqlalchemy.create_engine(
    "postgresql://admin:admin@192.168.69.24/kgaps")
conn = engine.connect()


@app.route('/api/', methods=['POST', 'GET'])
def index():
    data = {'error': 'none'}
    return json.dumps(data)


@app.route('/api/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        role = request.json['role']
        name = request.json['name']
        password = request.json['password']
        q = sqlalchemy.text(f"SELECT uid,name,role_id,department_id FROM user_details_check WHERE name='{
                            name}' and password='{password}' and role_id={role};")
        r = conn.execute(q).fetchall()
        print(r)
        if r:
            data = [dict(i._mapping) for i in r]
            print(data)
            response = jsonify(data[0])
            return response
        else:
            return json.dumps({'Error': 'Incorrect details entered'})


@app.route('/api/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        role = request.json['role']
        name = request.json['name']
        password = request.json['password']
        dept_id = request.json['department_id']
        id = request.json['id']
        p = sqlalchemy.text(
        f"SELECT * FROM t_users WHERE uid='{id}'")
        if not conn.execute(p).fetchall():
            q = sqlalchemy.text(f"INSERT INTO t_users VALUES({id},'{
                            name}','{password}',{dept_id});")
            conn.execute(q)
        q = sqlalchemy.text(f"SELECT * FROM l_role_user WHERE uid='{id}' AND role_id={role};")
        if not conn.execute(q).fetchall():
                    q = sqlalchemy.text(f"INSERT INTO l_role_user VALUES ('{id}',{role});")
                    conn.execute(q)
        conn.commit()
        print("success")
        return json.dumps({'data': 'Success'})

@app.route('/api/faculty_courses', methods=['POST', 'GET'])
def faculty_courses():
    uid = request.json['uid']
    q = sqlalchemy.text(
        f"SELECT distinct course_code,course_name FROM faculty_table WHERE uid='{uid}';")
    if conn.execute(q).fetchall() is not None:
        r = conn.execute(q).fetchall()
        print(r)
        if r:
            data = [dict(i._mapping) for i in r]
            return json.dumps(data)
    else:
        return json.dumps({"response":"no courses assigned"})


@app.route('/api/faculty/<int:uid>/<string:course_code>', methods=['POST', 'GET'])
def faculty(uid,course_code):
    q = sqlalchemy.text(
        f"SELECT * FROM faculty_table WHERE uid={uid} and status_code!=4 and course_code='{course_code}';")
    r = conn.execute(q).fetchall()
    if r:
        data = [dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)


@app.route('/api/faculty_completed/<int:uid>', methods=['POST', 'GET'])
def faculty_completed(uid):
    p = sqlalchemy.text(
        f"SELECT * FROM faculty_table WHERE uid='{uid}' and status_code=4;")
    if conn.execute(p).fetchall():
        s = conn.execute(p).fetchall()
        if s:
            data = [dict(i._mapping) for i in s]
            print(data)
            return json.dumps(data)
    else:
        print("fail")
        return json.dumps({'data': 'Failure'})


@app.route('/api/course_mentor/<int:id>', methods=['POST', 'GET'])
def course_mentor(id):
    q = sqlalchemy.text(
        f"SELECT * FROM domain_mentor_table WHERE mentor_id={id};")
    r = conn.execute(q).fetchall()
    if r:
        data = [dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)


@app.route('/api/domain_mentor/<int:id>', methods=['POST', 'GET'])
def domain_mentor(id):
    q = sqlalchemy.text(f"SELECT * FROM domain_mentor_table;")
    r = conn.execute(q).fetchall()
    if r:
        data = [dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)


@app.route('/api/courses', methods=['POST', 'GET'])
def courses():
    dept_id = request.json['department_id']
    q = sqlalchemy.text(
        f"Select c.course_code,c.course_name from t_course_details c,l_course_departments l where c.course_code=l.course_code and l.department_id='{dept_id}';")
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)


@app.route('/api/topics', methods=['POST', 'GET'])
def topics():
    course_code = request.json['course_code']
    q = sqlalchemy.text(
        f"Select c.topic_id,c.topic,c.outcome from t_course_topics c where c.course_code='{course_code}';")
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)


@app.route('/api/add_course', methods=['POST', 'GET'])
def add_course():
    if request.method == 'POST':
        course_code = request.json['course_code']
        course_name = request.json['course_name']
        dept_id = request.json['department_id']
        q = sqlalchemy.text(f"INSERT INTO t_course_details VALUES('{course_code}','{course_name}');")
        conn.execute(q)
        q = sqlalchemy.text(
            f"INSERT INTO l_course_departments VALUES('{course_code}',{dept_id});")
        conn.execute(q)
        conn.commit()
        return json.dumps({'data': 'Success'})


@app.route('/api/add_topic', methods=['POST', 'GET'])
def add_topic():
    if request.method == 'POST':
        course_code = request.json['course_code']
        topic = request.json['topic']
        outcome = request.json['outcome']
        total_hours = request.json['total_hours']
        q = sqlalchemy.text(f"INSERT INTO t_course_topics VALUES('{course_code}','{
                            outcome}','{topic}',{total_hours});")
        conn.execute(q)
        conn.commit()
        return json.dumps({'data': 'Success'})


@app.route('/api/faculty_info', methods=['POST', 'GET'])
def faculty_info():
    department_id = request.json['department_id']
    q = sqlalchemy.text(f"select * from user_details_check where role_id=1 and department_id={department_id};")  
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)

@app.route('/api/course_mentor_info', methods=['POST', 'GET'])
def course_mentor_info():
    department_id = request.json['department_id']
    q = sqlalchemy.text(f"select * from user_details_check where role_id=2 and department_id={department_id};")  
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)

@app.route('/api/domain_mentor_info', methods=['POST', 'GET'])
def domain_mentor_info():
    department_id = request.json['department_id']
    q = sqlalchemy.text(f"select * from user_details_check where role_id=3 and department_id={department_id};")  
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)

@app.route('/api/assign_mentor', methods=['POST', 'GET'])
def assign_mentor():
    course_code = request.json['course_code']
    uid = request.json['uid']
    if conn.execute(sqlalchemy.text(f"Select * from l_mentor_courses where course_code='{course_code}';")).first() != None:
            print("error-already assigned")
            return json.dumps({'error': 'mentor is already assigned to that course'})
    q = sqlalchemy.text(f"insert into l_mentor_courses values({uid},'{course_code}');")
    conn.execute(q)
    conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/assign_course', methods=['POST', 'GET'])
def assign_course():
    if request.method == 'POST':
        course_code = request.json['course_code']
        uid = request.json['uid']
        print(course_code,uid)
        if conn.execute(sqlalchemy.text(f"Select * from faculty_table where course_code='{course_code}' and uid={uid};")).first() != None:

            return json.dumps({'error': 'mentor is already assigned to that course'})
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
        print("here")
        return json.dumps({'data': 'Success'})
    return json.dumps({'response': 'incorrect method'})


@app.route('/api/edithourscompleted', methods=['POST', 'GET'])
def edithourscompleted():
    handler_id = request.json['handler_id']
    topic_id = request.json['topic_id']
    hours_completed = request.json['hours_completed']
    q = sqlalchemy.text(f"update t_complete_status set status_code=4,hours_completed={
                        hours_completed} where handler_id={handler_id} and topic_id={topic_id};")
    conn.execute(q)
    conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/editcomment/<int:approval>', methods=['POST', 'GET'])
def editcomment(approval):
    # approval can be true or false
    if approval == 0:
        topic_id = request.json['topic_id']
        comment = request.json['comment']
        q = sqlalchemy.text(f"update t_topic_comments set comment = '{
                            comment}' where topic_id={topic_id};")
        conn.execute(q)
        q = sqlalchemy.text(f"update t_complete_status set status_code=2 where topic_id={topic_id};")
        conn.execute(q)
        conn.commit()
    if approval == 1:
        topic_id = request.json['topic_id']
        q = sqlalchemy.text(f"update t_topic_comments set comment = '' where topic_id={topic_id};")
        conn.execute(q)
        q = sqlalchemy.text(f"update t_complete_status set status_code=3 where topic_id={topic_id};")
        conn.execute(q)
        conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/editlink', methods=['POST', 'GET'])
def editlink():
    topic_id = request.json['topic_id']
    link = request.json['link']
    q = sqlalchemy.text(f"update t_complete_status set status_code=1 where topic_id={topic_id};")
    conn.execute(q)
    q = sqlalchemy.text(f"update t_topic_links set url='{link}' where topic_id={topic_id};")
    conn.execute(q)
    conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/facultyprogress', methods=['POST', 'GET'])
def facultyprogress():
    handler_id = request.json['handler_id']
    q = sqlalchemy.text(f"SELECT status_code,COUNT(*) AS count FROM faculty_table WHERE uid = {
                        handler_id} AND status_code IN (0,1, 2, 3, 4) GROUP BY status_code;")
    r = conn.execute(q).fetchall()
    status = {0:"Not uploaded",1:"Uploaded",2:"Disapproved",3:"Approved",4:"Completed"}
    color_status = {0:'grey',1:'orange',2:'red',3:'green',4:'darkgreen'}
    codes,data,color = [status[i[0]] for i in r],[i[1] for i in r],[color_status[i[0]] for i in r]
    print(codes,data,color)
    return json.dumps({'status_code':codes,'count': data,'color': color}) 

@app.route('/api/mentor_list', methods=['POST', 'GET'])
def mentor_list():
    department_id = request.json['department_id']
    q = sqlalchemy.text(f"select b.uid,b.name,c.course_code from t_users b,l_mentor_courses c,l_course_departments d where b.uid=c.mentor_id and c.course_code=d.course_code and d.department_id={department_id};")
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)

if __name__ == '__main__':
    app.run(debug=True, port=5001, host="0.0.0.0")
