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
            id, 
            email,
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

const getRanks = (req, res) => {
    pool.query("SELECT * FROM ranks", (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const addUser = (req, res) => {
    const newUser = req.body;
    pool.query(`
        INSERT INTO users (
            email,
            last_name,
            first_name,
            rank_id,
            org_id,
            rater_id,
            additional_rater_id,
            closeout
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
        `, [
            newUser.email,
            newUser.last_name,
            newUser.first_name,
            newUser.rank_id,
            newUser.org_id,
            newUser.rater_id,
            newUser.additional_rater_id,
            newUser.closeout
        ], (err, result) => {
            if (err) {
                throw err;
            }

            const lastId = result.rows[0].id;
            if (lastId) {
                res.status(200).send({ newUserId: lastId });
            } else {
                res.status(500).send('Server error. Could not add user');
            }
        }
    )
}

const updateUser = (req, res) => {
    const userId = req.params.userId;
    const updatesArray = Object.entries(req.body);
    pool.query(`UPDATE users SET ${updatesArray[0][0]}=$1 WHERE id=$2;`, [updatesArray[0][1], userId],
        (err) => {
            if (err) {
                throw err;
            }

            pool.query(`SELECT * FROM users WHERE id=$1;`, [userId],
                (err, result) => {
                    if (err) {
                        throw err;
                    }

                    const updatedUser = result.rows[0];
                    if(updatedUser) {
                        res.status(201).send(updatedUser);
                    } else {
                        res.status(500).send('Server error. Could not update user');
                    }
                }
            )
        }
    )
}

const deleteUser = (req, res) => {
    const userId = req.params.userId;
    pool.query('DELETE FROM users WHERE id=$1', [userId], (err, result) => {
        if (err) {
            throw err;
        }

        res.status(204).send('Successfully deleted user.');
    })
}

module.exports = {
    getOrgs,
    getUser,
    getUsers,
    getRanks,
    addUser,
    updateUser,
    deleteUser
}
