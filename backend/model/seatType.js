const mongoose = require('mongoose')

const seatTypeSchema = new mongoose.Schema({})

module.exports = mongoose.model('SeatType', seatTypeSchema);