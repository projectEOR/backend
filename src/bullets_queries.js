const pool = require('./pool');


const getBullets = (req, res) => {
    let user_id = req.query.user_id
    pool.query("SELECT * FROM bullets WHERE user_id=$1;", [user_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const getBullet = (req, res) => {
    let bullet_id = req.params.bullet_id
    pool.query("SELECT * FROM bullets WHERE id=$1;", [bullet_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const createBullet = (req, res) => {
    let user_id = req.query.user_id
    if(user_id === null){
        res.status(400).send("No specified user_id")
    }
    
    pool.query("INSERT INTO bullets (user_id) VALUES ($1) RETURNING *", [user_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const updateBullet = (req, res) => {
    let bullet_id = req.params.bullet_id;
    let keys = Object.keys(req.body).toString();
    let values = Object.values(req.body);
    values = values.concat(bullet_id);
    pool.query("UPDATE bullets SET (user_id,report_id,content,support,editorial_notes) = ($1,$2,$3,$4,$5) WHERE id = $6 RETURNING *;", values , (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const deleteBullet = (req, res) => {
    let bullet_id = req.params.bullet_id;
    pool.query("DELETE FROM bullets WHERE id = $1 RETURNING *",[bullet_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

module.exports = {
    getBullets,
    getBullet,
    createBullet,
    updateBullet,
    deleteBullet
}
