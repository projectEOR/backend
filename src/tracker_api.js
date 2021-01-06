var express = require("express");
var router = express.Router();
const db = require("./tracker_queries");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", db.getTracker);
router.get("/org/:org_name_id", db.getTrackerByOrg);
router.get("/org/rater/:rater_id", db.getTrackerByRater);
router.get("/org/rater/ratee/:ratee_id", db.getTrackerByRatee);

module.exports = router;
