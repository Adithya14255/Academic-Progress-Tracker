
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    department_id INT
);

-- Create courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department_id INT,
    outcome VARCHAR(255),
    status INT,
    handler_id INT,
    hours_over INT,
    total_hours INT,
    url VARCHAR(255)
);
