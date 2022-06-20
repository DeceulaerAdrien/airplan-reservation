const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type:String,
        required: true
    },
    to: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
})




module.export = mongoose.model('Flight', flightSchema)