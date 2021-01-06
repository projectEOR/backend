const pool = require('./pool');

const getUser = (req,res) => {
    let userId = req.params.userId
    pool.query("SELECT * FROM users WHERE id=$1;", [userId], (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    })

}

const getUsers = (req, res) => {
    pool.query(`
        SELECT 
            username,
            last_name,
            first_name,
            rank_id,
            org_id,
            rater_id,
            additional_rater_id,
            closeout
        FROM users;`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send(result.rows);
        })
}

const getOrgs = (req, res) => {

    pool.query("SELECT * FROM orgs;", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const getSupervisors = (req,res) => {
    let org_id = req.query.org_id
    pool.query("SELECT * FROM users WHERE org_id=$1;", [org_id], (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const getRanks = (req, res) => {
    pool.query("SELECT * FROM ranks", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}



// const postUser = (req, res) => {
//
//}

module.exports = {
    getOrgs,
    getUser,
    getUsers,
    getSupervisors,
    getRanks
}
