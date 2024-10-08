from flask import Flask, request, jsonify
import requests
import sqlalchemy
import os
import json
from collections import defaultdict


app = Flask(__name__)

app.secret_key = "helloworld"
engine = sqlalchemy.create_engine(
    "postgresql://admin:admin@192.168.147.24/kgaps")
conn = engine.connect()


def progress_color(comp,total):
    try:
        value=comp/total
    except:
        return 'black'
    if value==0:
        return 'blue'
    elif value<0:
        return 'green'
    else:
        return 'red'

@app.route('/api/', methods=['POST', 'GET'])
def index():
    q = sqlalchemy.text(f"TRUNCATE TABLE t_complete_status,t_course_topics,t_topic_comments,t_topic_links;")
    r = conn.execute(q)
    conn.commit()
    print(q)
    data = {'error': 'none'}
    return json.dumps(data)

MOODLE_API_URL = "https://moodle.kgkite.ac.in/login/token.php"

@app.route('/api/moodle_login', methods=['POST','GET'])
def login_to_moodle():
    username = '22csa03'
    password = 'Kitestudent@123'
    
    # Prepare the payload for Moodle's API
    moodle_payload = {
        'username': username,
        'password': password,
        'service': 'moodle_mobile_app'  # Adjust if using another service
    }
    
    try:
        # Forward the request to Moodle
        moodle_response = requests.post(MOODLE_API_URL, data=moodle_payload)
        moodle_response.raise_for_status()  # Raise an error for bad responses
        print(moodle_response.json())
        # Return Moodle's response back to the Angular client
        return jsonify(moodle_response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        role = request.json['role']
        uid = request.json['name']
        password = request.json['password']
        q = sqlalchemy.text(f"SELECT uid,name,role_id,department_id FROM user_details_check WHERE uid='{uid}' and password='{password}' and role_id={role};")
        r = conn.execute(q).fetchall()
        if r:
            data = [dict(i._mapping) for i in r]
            if data[0]['role_id']==3:
                print("here")
                q = sqlalchemy.text(f"SELECT domain_id from l_domain_mentors where mentor_id={uid};")
                if conn.execute(q).fetchone():
                    data[0]['domain_id']=conn.execute(q).fetchone()[0]
                else:
                    return json.dumps({'Error':'Mentor has no assigned Domain'})
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
            q = sqlalchemy.text(f"INSERT INTO t_users VALUES({id},'{name}','{password}',{dept_id});")
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
        f"SELECT l.course_code,t.course_name FROM l_faculty_courses l,t_course_details t WHERE l.faculty_id='{uid}' and l.course_code=t.course_code;")
    if conn.execute(q).fetchall() is not None:
        r = conn.execute(q).fetchall()
        print(r)
        if r:
            data = [dict(i._mapping) for i in r]
            return json.dumps(data)
    else:
        return json.dumps({"response":"no courses assigned"})
    
@app.route('/api/coordinator_courses', methods=['POST', 'GET'])
def coordinator_courses():
    uid = request.json['uid']
    q = sqlalchemy.text(
        f"SELECT l.course_code,t.course_name FROM l_mentor_courses l,t_course_details t WHERE l.mentor_id='{uid}' and l.course_code=t.course_code;")
    if conn.execute(q).fetchall():
        r = conn.execute(q).fetchall()
        if r:
            data = [dict(i._mapping) for i in r]
            print(data)
            return json.dumps(data)
    else:
        return json.dumps({"response":"no courses assigned"})


@app.route('/api/faculty/<int:uid>/<string:course_code>', methods=['POST', 'GET'])
def faculty(uid,course_code):
    q = sqlalchemy.text(f"SELECT * FROM faculty_table WHERE uid={uid} and status_code!=4 and course_code='{course_code}';")
    if (conn.execute(q).fetchall()):
        r = conn.execute(q).fetchall()
        data = [dict(i._mapping) for i in r]
        print(data)
        return json.dumps(data)
    return json.dumps({'response':'No topics assigned yet'})

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
        return json.dumps({'response': 'no completed topics yet'})


@app.route('/api/course_mentor/<int:id>', methods=['POST', 'GET'])
def course_mentor(id):
    q = sqlalchemy.text(f"SELECT * FROM domain_mentor_table where mentor_id={id};")
    if conn.execute(q).first():
        r=conn.execute(q).fetchall()
        if r:
            data = [dict(i._mapping) for i in r]
            print(data)
            return json.dumps(data)
    else:
        return json.dumps({'response':'No topics added'})


@app.route('/api/domain_mentor/<int:id>', methods=['POST', 'GET'])
def domain_mentor(id):
    q = sqlalchemy.text(f"SELECT * FROM domain_mentor_table where domain_id='{id}';")
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
        domain_id = request.json['domain_id']
        print(domain_id)
        q = sqlalchemy.text(f"INSERT INTO t_course_details VALUES('{course_code}','{course_name}');")
        conn.execute(q)
        q = sqlalchemy.text(
            f"INSERT INTO l_course_departments VALUES('{course_code}',{dept_id});")
        conn.execute(q)
        q = sqlalchemy.text(f"INSERT INTO l_course_domains VALUES('{course_code}','{domain_id}');")
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
        uid= request.json['uid']
        if conn.execute(sqlalchemy.text(f"select topic_id from t_course_topics where course_code='{course_code}' and topic='{topic}';")).first() != None:
            print("error-topic exists")
            return json.dumps({'error': 'topic already exists in course'})
        q = sqlalchemy.text(f"INSERT INTO t_course_topics(course_code,outcome,topic,total_hours) VALUES('{course_code}','{outcome}','{topic}',{total_hours});")
        conn.execute(q)
        q = sqlalchemy.text(f"select topic_id from t_course_topics where course_code='{course_code}' and topic='{topic}';")
        topic_id=conn.execute(q).fetchone()[0]
        q = sqlalchemy.text(f"INSERT INTO t_topic_links values({topic_id}, {uid},'')")
        conn.execute(q)   
        q = sqlalchemy.text(f"INSERT INTO t_topic_comments values({topic_id}, {uid},'');")  
        conn.execute(q)
        q = sqlalchemy.text(f"""
            INSERT INTO t_complete_status (hours_completed, topic_id, handler_id, course_code, status_code)
            SELECT 0,{topic_id}, faculty_id, '{course_code}', 0
            FROM  l_faculty_courses
            WHERE l_faculty_courses.course_code = '{course_code}';
        """)
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

@app.route('/api/faculty_course_info', methods=['POST', 'GET'])
def faculty_course_info():
    course_code = request.json['course_code']
    q = sqlalchemy.text(f"select u.uid,u.name from l_faculty_courses l,user_details_check u where l.faculty_id=u.uid and u.role_id=1 and l.course_code='{course_code}';")  
    r = conn.execute(q).fetchall()
    data = [dict(i._mapping) for i in r]
    print(data)
    return json.dumps(data)

@app.route('/api/course_coordinator_info', methods=['POST', 'GET'])
def course_coordinator_info():
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

@app.route('/api/mentor_list', methods=['POST', 'GET'])
def mentor_list():
    department_id = request.json['department_id']
    q = sqlalchemy.text(f"select b.uid,b.name,c.course_code from t_users b,l_mentor_courses c,l_course_departments d where b.uid=c.mentor_id and c.course_code=d.course_code and d.department_id={department_id};")
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

@app.route('/api/assign_domain_mentor', methods=['POST', 'GET'])
def assign_domain_mentor():
    domain_id = request.json['domain_id']
    mentor_id = request.json['mentor_id']
    if conn.execute(sqlalchemy.text(f"Select * from l_domain_mentors where mentor_id={mentor_id} and domain_id={domain_id};")).first() != None:
            print("error-already assigned")
            return json.dumps({'error': 'mentor is already assigned to that domain'})
    q = sqlalchemy.text(f"insert into l_domain_mentors values({mentor_id},{domain_id});")
    conn.execute(q)
    conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/assign_course', methods=['POST', 'GET'])
def assign_course():
    if request.method == 'POST':
        course_code = request.json['course_code']
        uid = request.json['uid']
        print(course_code,uid)
        if conn.execute(sqlalchemy.text(f"Select * from l_faculty_courses where course_code='{course_code}' and faculty_id={uid};")).first() != None:
            return json.dumps({'error': 'mentor is already assigned to that course'})

        q = sqlalchemy.text(f"insert into l_faculty_courses values({uid},'{course_code}');")
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
    q = sqlalchemy.text(f"update t_complete_status set status_code=4,hours_completed={hours_completed} where handler_id={handler_id} and topic_id={topic_id};")
    conn.execute(q)
    conn.commit()
    return json.dumps({'data': 'Success'})


@app.route('/api/editcomment/<int:approval>', methods=['POST', 'GET'])
def editcomment(approval):
    # approval can be true or false
    if approval == 0:
        topic_id = request.json['topic_id']
        comment = request.json['comment']
        q = sqlalchemy.text(f"update t_topic_comments set comment = '{comment}' where topic_id={topic_id};")
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


@app.route('/api/faculty_progress', methods=['POST', 'GET'])
def facultyprogress():
    handler_id = request.json['handler_id']
    q = sqlalchemy.text(f"SELECT status_code,COUNT(*) AS count FROM faculty_table WHERE uid = {handler_id} AND status_code IN (0,1, 2, 3, 4) GROUP BY status_code;")
    r = conn.execute(q).fetchall()
    status = {0:"Not uploaded",1:"Uploaded",2:"Disapproved",3:"Approved",4:"Completed"}
    color_status = {0:'lightgrey',1:'orange',2:'red',3:'green',4:'#4b007d'}
    codes,mdata,mcolor = [status[i[0]] for i in r],[i[1] for i in r],[color_status[i[0]] for i in r]
    q = sqlalchemy.text(f"SELECT course_code,status_code,COUNT(*) AS count FROM faculty_table WHERE uid = {handler_id} AND status_code IN (0,1, 2, 3, 4) GROUP BY status_code,course_code;")
    r = conn.execute(q).fetchall()
    print(r)
    data = defaultdict(lambda: defaultdict(int))
    for course_id, status_code, count in r:
        data[course_id][status[status_code]] = count,color_status[status_code]
    json_output = json.dumps(data, indent=4)
    q = sqlalchemy.text(f"SELECT COALESCE(active_courses.hours_completed, 0) AS hours_completed, COALESCE(active_courses.total_hours, 0) AS total_hours, all_courses.course_code FROM (SELECT DISTINCT course_code FROM faculty_table WHERE uid = '{handler_id}') AS all_courses LEFT JOIN (SELECT course_code, SUM(hours_completed) AS hours_completed, SUM(total_hours) AS total_hours FROM faculty_table WHERE status_code = 4 AND uid = '{handler_id}' GROUP BY course_code, uid) AS active_courses ON all_courses.course_code = active_courses.course_code;")
    r = conn.execute(q).fetchall()
    course_data_current = []
    for i in r:
        temp={'completed_hours':i[0],'total_hours':i[1],'bar_color':progress_color(i[0],i[1]),'course_code':i[2]}
        course_data_current.append(temp)
    q = sqlalchemy.text(f"SELECT all_courses.course_code,COALESCE(active_courses.active_course_count, 0),all_courses.total_course_count AS active_course_count FROM (SELECT course_code, COUNT(*) AS total_course_count FROM faculty_table WHERE uid = '{handler_id}' GROUP BY course_code, uid) AS all_courses LEFT JOIN (SELECT course_code, COUNT(*) AS active_course_count FROM faculty_table WHERE uid = '{handler_id}' AND status_code = 4 GROUP BY course_code, uid) AS active_courses ON all_courses.course_code = active_courses.course_code;")
    r = conn.execute(q).fetchall()
    course_data_overall = []
    for i in r:
        temp={'course_code':i[0],'count':i[1],'total_count':i[2]}
        course_data_overall.append(temp)
    print(course_data_current,course_data_overall)
    return json.dumps({'main':{'status_code':codes,'count': mdata,'color': mcolor},'other':json_output,'course_data_current':course_data_current,'course_data_overall':course_data_overall}) 



@app.route('/api/course_progress', methods=['POST', 'GET'])
def course_progress():
    course_code = request.json['course_code']
    q = sqlalchemy.text(f"SELECT status_code,COUNT(*) FROM domain_mentor_table WHERE course_code='{course_code}' and status_code IN (0,1, 2, 3, 4) GROUP BY status_code,course_code;")
    r = conn.execute(q).fetchall()
    status = {0:"Not uploaded",1:"Uploaded",2:"Disapproved",3:"Approved",4:"Completed"}
    color_status = {0:'lightgrey',1:'orange',2:'red',3:'green',4:'purple'}
    codes,mdata,mcolor = [status[i[0]] for i in r],[i[1] for i in r],[color_status[i[0]] for i in r]
    q = sqlalchemy.text(f"SELECT all_courses.uid, t.name, all_courses.course_code, COALESCE(active_courses.hours_completed, 0) AS hours_completed, COALESCE(active_courses.total_hours, 0) AS total_hours FROM (SELECT DISTINCT course_code, uid FROM faculty_table where course_code='{course_code}') AS all_courses LEFT JOIN (SELECT course_code, uid, SUM(hours_completed) AS hours_completed, SUM(total_hours) AS total_hours FROM faculty_table WHERE status_code = 4 and course_code='{course_code}' GROUP BY course_code, uid) AS active_courses ON all_courses.course_code = active_courses.course_code AND all_courses.uid = active_courses.uid JOIN t_users t ON all_courses.uid = t.uid;")
    r = conn.execute(q).fetchall()
    course_data_current = []
    for i in r:
        temp={'uid':i[0],'name':i[1],'course_code':i[2],'completed_hours':i[3],'total_hours':i[4],'bar_color':progress_color(i[3],i[4])}
        course_data_current.append(temp)
    q = sqlalchemy.text(f"SELECT f.uid, t.name, f.course_code, COUNT(*) AS total_topics_assigned, SUM(CASE WHEN f.status_code = 4 THEN 1 ELSE 0 END) AS topics_completed FROM faculty_table f JOIN t_users t ON t.uid = f.uid WHERE f.course_code = '{course_code}' GROUP BY f.uid, f.course_code, t.name;")
    r = conn.execute(q).fetchall()
    course_data_overall = []
    for i in r:
        temp={'uid':i[0],'name':i[1],'course_code':i[2],'count':i[4],'total_count':i[3]}
        course_data_overall.append(temp)
    print(course_data_overall,course_data_current)
    return json.dumps({'main':{'status_code':codes,'count': mdata,'color': mcolor},'course_data_overall':course_data_overall,'course_data_current':course_data_current}) 

if __name__ == '__main__':
    app.run(debug=True, port=5001, host="0.0.0.0")
