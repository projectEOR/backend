const express = require('express')
const app = express()
const port = 3000

//APIs
var reports = require('./reports_api')
app.use('/reports', reports)

var bullets = require('./bullets_api')
app.use('/bullets', bullets)





app.listen(port, () => console.log(`EOR API listening at http://localhost:${port}`))