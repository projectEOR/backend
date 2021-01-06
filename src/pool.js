/////////Start and share pool
// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'eor',
//     password: 'eor',
//     port: 8000
// });

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "bigbootyjudy",
  host: "localhost",
  database: "capstone_db",
  password: "",
  port: 5432,
});

module.exports = pool;
