const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'eor',
    password: 'eor',
    port: 8000
});
//const pool = require('./pool');

const getUser = (req,res) => {
    let org_id = req.params.org_id
    pool.query("SELECT * FROM orgs WHERE parentid=$1;", [org_id], (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    })

}

const getOrgs = (req, res) => {

    pool.query("SELECT * FROM orgs", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const getSupervisors = (req,res) => {
    let org_id = req.params.org_id
    pool.query("SELECT * FROM users WHERE org_id=$1;", [org_id], (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    })

}

const postUser = (req, res) => {

}

module.exports = {
    getUsers,
    getUser,
    postUser
}
