var express = require('express')

var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now())
    next()
})

// respond with "hello world" when a GET request is made to the homepage
router.get('/', function (req, res) {
    res.send('hello reports')
})

module.exports = router