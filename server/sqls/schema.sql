-- Create the t_roles table 
CREATE TABLE t_roles(
  role_id INT PRIMARY KEY,  
  designation VARCHAR(24) NOT NULL
);
-- Create the t_departments table
CREATE TABLE t_departments(
  department_id INT PRIMARY KEY,
  department_name VARCHAR(24) NOT NULL
);

-- Create the t_course_details table
CREATE TABLE t_course_details (
  course_code VARCHAR(24) PRIMARY KEY,
  course_name VARCHAR(24) NOT NULL
);

-- Create the t_status table 
CREATE TABLE t_status (
  status_code INT PRIMARY KEY,
  status VARCHAR(24) NOT NULL
);

-- Create the t_users table
CREATE TABLE t_users (
  uid INT PRIMARY KEY,
  name VARCHAR(24) NOT NULL,
  password VARCHAR(24) NOT NULL,
  department_id INT NOT NULL, 
  FOREIGN KEY (department_id) REFERENCES t_departments(department_id)
);

-- Create the t_course_topics table 
CREATE TABLE t_course_topics (
  course_code VARCHAR(24) NOT NULL,
  outcome VARCHAR(4),
  topic VARCHAR(24) NOT NULL,
  topic_id INT PRIMARY KEY,
  FOREIGN KEY (course_code) REFERENCES t_course_details(course_code)
);

-- Create the l_role_user table
CREATE TABLE l_role_user (
  uid INT NOT NULL,  
  role_id INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES t_users(uid),
  FOREIGN KEY (role_id) REFERENCES t_roles(role_id)
);

-- Create the l_course_departments table
CREATE TABLE l_course_departments (
  course_code VARCHAR(24) NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (course_code) REFERENCES  t_course_details(course_code),
  FOREIGN KEY (department_id) REFERENCES t_departments(department_id)
);


-- Create the t_hours table
CREATE TABLE t_hours (
  topic_id INT,
  total_hours INT,
 FOREIGN KEY (topic_id) REFERENCES t_course_topics(topic_id)
 );


-- Create the t_topic_links table 
CREATE TABLE t_topic_links (
  topic_id INT NOT NULL,
  handler_id INT NOT NULL,
  url VARCHAR(24),
  FOREIGN KEY (topic_id) REFERENCES t_course_topics(topic_id),
  FOREIGN KEY (handler_id) REFERENCES t_users(uid)
);

-- Create the t_topic_comments table 
CREATE TABLE t_topic_comments (
  topic_id INT NOT NULL,
  handler_id INT NOT NULL,
  comment VARCHAR(255),
  FOREIGN KEY (topic_id) REFERENCES t_course_topics(topic_id),
  FOREIGN KEY (handler_id) REFERENCES t_users(uid)
);

-- Create the t_hours_completed table
CREATE TABLE t_complete_status (
  hours_completed INT DEFAULT 0,  
  topic_id INT,  
  handler_id INT,
  course_code VARCHAR(24) NOT NULL,
  status_code INT DEFAULT 0,
  FOREIGN KEY (course_code) REFERENCES t_course_details(course_code),
  FOREIGN KEY (status_code) REFERENCES t_status(status_code), 
  FOREIGN KEY (topic_id) REFERENCES t_course_topics(topic_id),
  FOREIGN KEY (handler_id) REFERENCES t_users(uid)
);


--view to check user details

create view user_details_check as select u.uid,u.name,u.password,u.department_id,r.role_id from t_users u,l_role_user r where u.uid=r.uid;

--view for faculty table

create view faculty_table as select u.uid,c.course_code,d.course_name,t.topic,t.outcome,c.status_code,c.hours_completed  from t_users u,t_complete_status c,t_course_details d,t_course_topics t where u.uid=c.handler_id and c.course_code=d.course_code and t.topic_id=c.topic_id;

--view for course mentor and domain mentor table

create view mentor_table as select u.uid,c.course_code,d.course_name,t.topic,t.outcome,c.status_code,l.url  from t_users u,t_complete_status c,t_course_details d,t_course_topics t,t_topic_links l where u.uid=c.handler_id and c.course_code=d.course_code and t.topic_id=c.topic_id and l.topic_id=c.topic_id;

-- initialize the roles
INSERT INTO t_roles (role_id, designation) VALUES (1, 'Faculty'), (2, 'Course Mentor'), (3, 'Domain Mentor'),(4,'Admin');