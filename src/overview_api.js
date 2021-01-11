var express = require('express')
var router = express.Router()
const db=require('./overview_queries')
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/:org_id', db.getOverview)

router.get('/children/:org_id', db.getOrgChildren)

module.exports=router

