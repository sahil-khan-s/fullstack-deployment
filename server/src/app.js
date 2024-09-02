const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Allow all origins
app.use(cors({
    origin: true, 
    methods: ['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true 
}));

// Middleware to parse JSON requests
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

module.exports = app;
