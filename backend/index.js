const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 8080
const connectDB = require('./config/db')

// connect to database
connectDB()

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/users', require('./routes/userRoutes'))
// Listening port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
