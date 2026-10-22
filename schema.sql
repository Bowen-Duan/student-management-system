-- Student Management System - database schema
-- Matches the queries used in routes/auth.js and routes/student.js.

CREATE DATABASE IF NOT EXISTS student_system
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE student_system;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL COMMENT 'bcrypt hash',
  email      VARCHAR(100) DEFAULT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'user' COMMENT 'user | admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS students (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  age        INT DEFAULT NULL,
  major      VARCHAR(100) DEFAULT NULL,
  owner_id   INT DEFAULT NULL COMMENT 'user who created the record',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_students_owner FOREIGN KEY (owner_id) REFERENCES users (id)
    ON DELETE SET NULL
) ENGINE = InnoDB;

-- To make a registered account an administrator:
-- UPDATE users SET role = 'admin' WHERE username = 'your_name';
