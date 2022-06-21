const express = require('express');
const router = express.Router({mergeParams: true});
const {createFlight} = require("../controller/flightController")
const auth = require('../middleware/authMiddleware')


router.post('/',createFlight)




router.get('/',(req,res) => {
    res.json({message:'Welcom to the flight routes'})
})


// router.get('/:id',)
// router.put('/:id',)
// router.delete('/:id',)
module.exports = router;