const asyncHandler = require('express-async-handler');
const Reservation = require('../model/reservationModel');
const Flight = require('../model/flightModel');
const User = require('../model/userModel');


// @desc create reservtion
// @route post /api/flights
// @access public after make that private when jwt setup
const createReservation = asyncHandler(async (req, res) => {

    const userID = await User.findById(req.user.id);
    if(!userID) {
        res.status(400);
        throw new Error('User not found');
    }

    const flightID = await Flight.findById(req.params.flightid);
    console.log(flightID);
})

const getAllReservation = asyncHandler(async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations);
})

module.exports ={
    createReservation
}