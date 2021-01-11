var express = require("express");
var router = express.Router();
const db = require("./tracker_queries");

router.use(express.json());

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", db.getTracker);
router.post("/", db.createTrack);
router.get("/org/:org_name_id", db.getTrackerByOrg);
router.get("/rater/:rater_id", db.getTrackerByRater);
router.get("/ratee/:ratee_id", db.getTrackerByRatee);
router.delete("/ratee/:ratee_id", db.deleteTrack);
router.put("/ratee/:ratee_id", db.updateAction);

module.exports = router;
