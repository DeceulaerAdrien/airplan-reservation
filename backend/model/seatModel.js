const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    isBooked:{
        type: Boolean,
        default: false
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
    },
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    }
});

module.exports = mongoose.model('Seat', seatSchema);