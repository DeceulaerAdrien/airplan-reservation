const asyncHandler = require('express-async-handler');
const Flight = require('../model/flightModel');

// @desc create flight
// @route post /api/flights
// @access public after make that private when jwt setup
const createFlight = asyncHandler(async (req, res) => {
    const {name,from,to,date,time,price} = req.body
  
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


})

module.exports = {
    createFlight,
}