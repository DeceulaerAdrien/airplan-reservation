const mongoose = require('mongoose')

const seatTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['first', 'business', 'economy']
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('SeatType', seatTypeSchema);