USE scss_punny_db;

TRUNCATE TABLE puns;
LOAD
DATA LOCAL INFILE 'cloud_data.txt' INTO
TABLE puns
(pun);
