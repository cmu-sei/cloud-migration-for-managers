USE scss_punny_db;

TRUNCATE TABLE puns;
LOAD
DATA LOCAL INFILE 'scripts/data.txt' INTO
TABLE puns
(pun);
