var express = require('express')
var router = express.Router()
const queries = require('./reports_queries')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now())
    next()
})

//get ALL Reports
router.get('/', queries.getReports)

//get Specified Report
router.get('/:report_id', queries.getReport)

//Create a new Report
router.post('/', queries.createReport)

//Update a report
router.put('/:report_id', queries.updateReport)

//Delete a report
router.delete('/:report_id', queries.deleteReport)

module.exports = router
