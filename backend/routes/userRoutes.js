const express = require('express');
const router = express.Router();
const {getUsers,createUser} = require('../controller/userController')


router.get('/', getUsers)
router.post('/', createUser)

// router.ger('/:id',getuserById)
// router.put('/:id',updateuserById)
// router.delete('/:id',deleteuserById)
module.exports = router;