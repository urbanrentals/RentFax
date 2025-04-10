require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/database');

const reportsRoutes = require('./routes/reports');
const paymentRoutes = require('./routes/payment');

const app = express(); // ✅ Define 'app' before using it

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/reports', reportsRoutes);
app.use('/api/payment', paymentRoutes);

// Global error handling for unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
    process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
