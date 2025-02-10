const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/auto_spares_db');



// API routes
app.get('/', (req, res) => {
    res.send('Hello from the Auto Spares Management System');
});

// Set up server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userroutes');
const inventoryRoutes = require('./routes/inventoryroutes');



// Middleware
app.use(bodyParser.json());

// Connect to MongoDB

// Routes
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

