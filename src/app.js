const cors = require('cors')

const express = require('express')
const app = express()

app.use(cors())

//APIs
var reports = require('./reports_api')
app.use('/reports', reports)

var bullets = require('./bullets_api')
app.use('/bullets', bullets)

module.exports = app;

