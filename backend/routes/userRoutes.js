const express = require('express');
const router = express.Router();
const {getUsers} = require('../controller/userController')
const auth = require('../middleware/authMiddleware')


router.get('/',auth,getUsers)
// router.ger('/:id',getuserById)
// router.put('/:id',updateuserById)
// router.delete('/:id',deleteuserById)
module.exports = router;