CREATE DATABASE scss_punny_db;
CREATE USER 'scss-user'@'%' IDENTIFIED BY 'scss-password';
GRANT SELECT, INSERT, DELETE, UPDATE ON scss_punny_db.* TO 'scss-user'@'%';
FLUSH PRIVILEGES;
