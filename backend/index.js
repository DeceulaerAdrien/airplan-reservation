const express = require('express');
const helmet = require('helmet')
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

// connect to database
connectDB()

//
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/seats', require('./routes/seatRoutes'))
app.use('/api/seatTypes', require('./routes/seatTypeRoutes'))
app.use('/api/reservations', require('./routes/reservationRoutes'))
app.use('/api/flights', require('./routes/flightRoutes'))


// Listening port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
