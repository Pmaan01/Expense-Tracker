const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

// Import routes
const expenseRoutes = require('./Routes/expense');
const userRoutes = require('./Routes/user');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DB Connected'))
    .catch(error => console.error(`Error connecting to DB: ${error.message}`));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve static HTML file
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dashboard.html'));
});

// API routes
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/user', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
