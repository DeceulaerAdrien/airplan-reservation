const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
module.exports = asyncHandler(async(req, res, next) => {
    try{
        // Extra token (it'll contain Bearer word)
        let token = req.headers.authorization.split(' ')[1];
        // Decoded token to use verify
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        // get user from token
        req.user = await User.findById(decodedToken.id).select('-password')
       
        next()
    }catch(error){
        res.status(401)
        throw new Error('Not allowed!')
    }
})