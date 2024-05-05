from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host='db',  # Docker Compose service name
    user='user',
    password='password',
    database='kgaps'
)

# Check if MySQL connection is successful
if mysql_connection.is_connected():
    print('Connected to MySQL database')
else:
    print('Failed to connect to MySQL database')

# Define a route to fetch data from MySQL
@app.route('/')
def index():
    cursor = mysql_connection.cursor()
    cursor.execute(f'SHOW tables;')
    if cursor.fetchall():
        pass
    else:
        data= "hi bro"
    cursor.close()
    return "hello"


