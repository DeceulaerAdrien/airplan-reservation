const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../utils/generateJWT')



// @desc create a user
// @route post /api/users
// @access public after make that private when jwt setup
const register = asyncHandler(async (req, res) => {
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

    const user = await User.create({
        firstname,
        lastname,
        password:hashed,
        email,
        phone,
        dob,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
        
    })

    if(user){
        res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }) 
    }else{
        res.status(400)
        throw new Error('Invalide user data')
    }
})
// @desc login user
// @route post /api/users
// @access public after make that private when jwt setup
const login = asyncHandler(async (req, res) => {
  
    const {email,password} = req.body

    const user =  await User.findOne({email})
    // check password matching 
    const match = await bcrypt.compare(password,user.password);
    if(match){
        res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }) 
    }else{
        res.status(400)
        throw new Error('Invalide credentials')
    }

})

// @desc get all users
// @route GET /api/users
// @access private , admin 
const getUsers = asyncHandler(async (req, res) => {

    const userID = await User.findById(req.user.id);
    if (!userID) {
        res.status(400)
        throw new Error('user not found')
    }
    // if user admin then allow to get all users
    if (userID.isAdmin) {
        const users = await User.find({})
        res.json(users)
    }else{
        res.status(400)
        throw new Error("you are not allowed to get all users")
    }
})



module.exports = {
    getUsers,
    register,
    login
}