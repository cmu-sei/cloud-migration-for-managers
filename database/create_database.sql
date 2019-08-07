CREATE DATABASE IF NOT EXISTS scss_punny_db;
CREATE USER IF NOT EXISTS 'scss-user'@'%' IDENTIFIED BY 'scss-password';
GRANT SELECT, INSERT, DELETE, UPDATE ON scss_punny_db.* TO 'scss-user'@'%';
FLUSH PRIVILEGES;
