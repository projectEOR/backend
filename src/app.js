const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//APIs
var reports = require('./reports_api')
app.use('/reports', reports)

var bullets = require('./bullets_api')
app.use('/bullets', bullets)

var overview = require('./overview_api')
app.use('/overview', overview)

const profiles = require('./profiles_api');
app.use('/profiles', profiles);

module.exports = app;

