To run from Docker:
docker run -p 8000:5432 -d --name db eor_db

To run,

docker build . -t eor-database:latest .

docker run -p 8000:5432 -d --name db eor-database

if you need to make changes:

docker rm db

then do the steps above again.
