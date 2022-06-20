const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'},
    seat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat'},
})


module.exports = mongoose.model('Reservation', reservationSchema);