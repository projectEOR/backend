To run from Docker:
docker run -p 8000:5432 -d --name db eor_db

To run,

docker build . -t eor-database:latest .

docker run -p 8000:5432 -d --name db eor-database

if you need to make changes:

docker rm db

then do the steps above again.

**_BREAK BREAK_**

- Changed Pool settings from docker file to local db
  --on pool.js delete active pool (capstone_db) and uncomment the 'eor' db

- Changed the varchar length of the member_role column in the tracker table
  --use command:
  "ALTER TABLE tracker ALTER COLUMN member_role TYPE varchar(15);"

Silva

**_END_**
