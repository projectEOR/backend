const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

//APIs
var reports = require("./reports_api");
app.use("/reports", reports);

var bullets = require("./bullets_api");
app.use("/bullets", bullets);

var overview = require("./overview_api");
app.use("/overview", overview);

var tracker = require("./tracker_api");
app.use("/tracker", tracker);

module.exports = app;
