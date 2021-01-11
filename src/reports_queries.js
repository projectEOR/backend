const pool = require('./pool');


const getReports = (req, res) => {
    let user_id = req.query.user_id
    pool.query("SELECT * FROM reports WHERE user_id=$1;", [user_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const getReport = (req, res) => {
    let report_id = req.params.report_id
    pool.query("SELECT * FROM reports WHERE id=$1;", [report_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const createReport = (req, res) => {
    let user_id = req.query.user_id
    if(user_id === null){
        res.status(400).send("No specified user_id")
    }
    let pr_type = req.body.pr_type
    if (pr_type === null) {
        res.status(400).send("No specified pr_type")
    }
    pool.query("INSERT INTO reports (user_id, pr_type) VALUES ($1,$2) RETURNING *", [user_id,pr_type], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const updateReport = (req, res) => {
    let report_id = req.params.report_id;
    let keys = Object.keys(req.body).toString();
    let values = Object.values(req.body);
    values = values.concat(report_id);
    pool.query("UPDATE reports SET (user_id,pr_type,afsc,org_id,job_desc,period_start,period_end,sup_days,non_rated_days,last_feedback,rater_id,addl_rater_id,reviewer_id,func_id,remarks,referral_report,pfactors) = ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) WHERE id = $18 RETURNING *;", values , (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

const deleteReport = (req, res) => {
    let report_id = req.params.report_id;
    pool.query("DELETE FROM reports WHERE id = $1 RETURNING *",[report_id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).send(result.rows);
    })
}

module.exports = {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport
}
