const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware')


router.get('/',(req,res) => {
    res.json({message:'Welcom to seat routes'})
})
// router.get('/:id',)
// router.put('/:id',)
// router.delete('/:id',)
module.exports = router;