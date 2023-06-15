const express = require('express');
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Load routes
const authRoutes = require('./routes/authRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');

// Use routes
app.use('/api', authRoutes);
app.use('/api', questionnaireRoutes);

module.exports = app;
