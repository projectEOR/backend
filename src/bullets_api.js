var express = require('express')
var router = express.Router()
const queries = require('./bullets_queries')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    //console.log('Time: ', Date.now())
    next()
})

//get ALL Bullets
router.get('/', queries.getBullets)

//get Specified Bullet
router.get('/:bullet_id', queries.getBullet)

//Create a new Bullet
router.post('/', queries.createBullet)

//Update a bullet
router.put('/:bullet_id', queries.updateBullet)

//Delete a bullet
router.delete('/:bullet_id', queries.deleteBullet)

module.exports = router