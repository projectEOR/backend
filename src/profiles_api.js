const express = require('express');
const router = express.Router();

const db = require('./profiles_queries');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})



module.exports = router;

