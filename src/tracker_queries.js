const app = require("./app");
const pool = require("./pool");

const getTracker = (req, res) => {
  pool.query("SELECT * FROM Tracker ORDER BY closeout ASC", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

const getTrackerByOrg = (req, res) => {
  let org_name_id = parseInt(req.params.org_name_id);
  pool.query(
    "SELECT * FROM Tracker WHERE org_name_id=$1 ORDER BY closeout ASC;",
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
    "SELECT * FROM Tracker WHERE rater_id=$1 ORDER BY closeout ASC;",
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

const updateAction = (request, response) => {
  const ratee_id = parseInt(request.params.ratee_id);
  const { action_id, member_role } = request.body;

  pool.query(
    "UPDATE Tracker SET action_id = $1, member_role = $2 WHERE ratee_id = $3",
    [action_id, member_role, ratee_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID`);
    }
  );
};

const createTrack = (request, response) => {
  const {
    closeout,
    sq_suspense,
    gp_suspense,
    wg_suspense,
    member_role,
    ratee_id,
    rater_id,
    action_id,
    org_name_id,
  } = request.body;

  pool.query(
    "INSERT INTO Tracker (closeout, sq_suspense, gp_suspense, wg_suspense, member_role, ratee_id, rater_id, action_id, org_name_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      closeout,
      sq_suspense,
      gp_suspense,
      wg_suspense,
      member_role,
      ratee_id,
      rater_id,
      action_id,
      org_name_id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`record added with ID`);
    }
  );
};

const deleteTrack = (request, response) => {
  const id = parseInt(request.params.ratee_id);

  pool.query(
    "DELETE FROM Tracker WHERE ratee_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Deleted record with ID`);
    }
  );
};

module.exports = {
  getTracker,
  getTrackerByOrg,
  getTrackerByRater,
  getTrackerByRatee,
  createTrack,
  deleteTrack,
  updateAction,
};
