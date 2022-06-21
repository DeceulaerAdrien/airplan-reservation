const asyncHandler = require('express-async-handler');
const Flight = require('../model/flightModel');
const User = require('../model/userModel');
// @desc create flight
// @route post /api/flights
// @access private , admin
const createFlight = asyncHandler(async (req, res) => {
    const {name,from,to,date,time,price} = req.body
    // check user is logged in
    const userID = await User.findById(req.user.id);
    console.log(userID)
    if (!userID) {
        res.status(400)
        throw new Error('user not found')
    }
    // if user admin then allow to create flight
    if (userID.isAdmin) {

        if(!name || !from || !to || !date || !time || !price) {
            res.status(400)
            throw new Error("please provide all the fieald")
        }
        const flight = await Flight.create({name,from,to,date,time,price})
        if(!flight){
            res.status(400)
            throw new Error("flight not created")
        }
        res.status(201).json(flight)
    }
    else {
        res.status(400)
        throw new Error("you are not allowed to create flight")
    }
})
// @desc get all flights
// @route get /api/flights
// @access private , admin or user
const getAllFlights = asyncHandler(async (req, res) => {
    // get current user logged in

    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }

    const flights = await Flight.find({})
    if(!flights){
        res.status(400)
        throw new Error("flights not found")
    }
    res.status(200).json(flights)
})
// @desc get flight by id
// @route get /api/flights/:id
// @access private , admin or user
const getFlightById = asyncHandler(async (req, res) => {
    const userID = await User.findById(req.user.id);

    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }

    const flight = await Flight.findById(req.params.id)
    if(!flight){
        res.status(400)
        throw new Error("flight not found")
    }
    res.status(200).json(flight)
})
// @desc update flight
// @route get /api/flights/:id
// @access private , only admin can update flight
const updateFlight = asyncHandler(async (req, res) => {

    const {name,from,to,date,time,price,seatNumber} = req.body
    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }


    const flight = await Flight.findById(req.params.id)
    if(!flight){
        res.status(400)
        throw new Error("flight not found")
    }
    if(userID.isAdmin){
        const updateFlight = await Flight.findByIdAndUpdate(flight,{
            name,
            from,
            to,
            date,
            time,
            price,
            seatNumber
        },{new:true})
        if(!updateFlight){
            res.status(400)
            throw new Error("flight not updated")
        }
        res.status(200).json(updateFlight)
    }else{
        res.status(400)
        throw new Error("you are not allowed to update flight")
    }
})
// @desc delete flight
// @route get /api/flights/:id
// @access private , only admin can delete flight
const deleteFlight = asyncHandler(async (req, res) => {
    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }
    if(userID.isAdmin){
        const flight = await Flight.findByIdAndDelete(req.params.id)
        if(!flight){
            res.status(400)
            throw new Error("flight not deleted")
        }
        res.status(200).json("flight deleted")
    }else{
        res.status(400)
        throw new Error("you are not allowed to delete flight")
    }
})
module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateFlight,
    deleteFlight
}