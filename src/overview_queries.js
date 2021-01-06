const pool = require("./pool");

const getOverview = (req, res) => {
  let org_id = req.params.org_id;
  pool.query(
    "SELECT * FROM users WHERE org_id=$1;",
    [org_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

const getOrgChildren = (req, res) => {
  let org_id = req.params.org_id;
  pool.query(
    "SELECT * FROM orgs WHERE parentid=$1;",
    [org_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

module.exports = {
  getOverview,
  getOrgChildren,
};
