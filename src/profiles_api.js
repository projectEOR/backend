const express = require('express');
const router = express.Router();

const db = require('./profiles_queries');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', db.getUsers);

router.get('/user/:userId', db.getUser);

router.put('/user/:userId', db.updateUser);

router.post('/', db.addUser);

router.delete('/user/:userId', db.deleteUser);

router.get('/orgs', db.getOrgs);

router.get('/ranks', db.getRanks);



module.exports = router;

