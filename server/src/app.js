// Import required modules
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();
FRONTEND_URL = "https://fullstack-deployment-2.onrender.com/"
// Environment-specific settings
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

// Configure CORS with specific origin
app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify allowed methods
    credentials: true // Allow credentials if needed (e.g., cookies)
}));

// Middleware to parse JSON requests
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Export the app module
module.exports = app;
