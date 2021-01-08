///////Start and share pool
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "eor",
  password: "eor",
  port: 8000,
});

module.exports = pool;
