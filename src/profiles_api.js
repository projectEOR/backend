const express = require('express');
const router = express.Router();

const db = require('./profiles_queries');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', db.getUsers);

router.get('/:userId', db.getUser);

router.get('/orgs', db.getOrgs);

router.get('/ranks', db.getRanks);

module.exports = router;

