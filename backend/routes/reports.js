const express = require('express');
const { submitReport } = require('../controllers/reportsController');
const router = express.Router();

// Route to submit a risk report
router.post('/submit', submitReport);

module.exports = router;
