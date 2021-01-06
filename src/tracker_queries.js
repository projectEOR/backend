const pool = require("./pool");

const getTracker = (req, res) => {
  pool.query("SELECT * FROM Tracker", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

const getTrackerByOrg = (req, res) => {
  let org_name_id = parseInt(req.params.org_name_id);
  pool.query(
    "SELECT * FROM Tracker WHERE org_name_id=$1;",
    [org_name_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

const getTrackerByRater = (req, res) => {
  let rater_id = parseInt(req.params.rater_id);
  pool.query(
    "SELECT * FROM Tracker WHERE rater_id=$1;",
    [rater_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

const getTrackerByRatee = (req, res) => {
  let ratee_id = parseInt(req.params.ratee_id);
  pool.query(
    "SELECT * FROM Tracker WHERE ratee_id=$1;",
    [ratee_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

module.exports = {
  getTracker,
  getTrackerByOrg,
  getTrackerByRater,
  getTrackerByRatee,
};
