const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')




// @desc create a user
// @route post /api/users
// @access public after make that private when jwt setup

const createUser = asyncHandler(async (req, res) => {
    const {firstname,lastname,password,email,dob,phone} = req.body;
    // check if all fields are filled
    if(!firstname || !lastname || !password || !email || !dob || !phone){
        res.status(400)
        throw new Error('please enter all fields')
    }

    // check if email is already in use
    const emailExist = await User.findOne({email})
    if(emailExist){
        res.status(400)
        throw new Error('email already exist')
    }
    // hash password
    const saltRounds = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password,saltRounds)
    console.log(hashed)

    // check password matching 
    const match = await bcrypt.compare(password,hashed);
    console.log(match)

    if(match){
        const user = await User.create({
            firstname,
            lastname,
            password:hashed,
            email,
            phone,
            dob,
           
        })
        res.status(200).json(user)
    }else{
        res.status(400).json({message:'password not matching'})
    }


})
// @desc get all users
// @route GET /api/users
// @access public after make that private when jwt setup

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

})


module.exports = {
    getUsers,
    createUser
}