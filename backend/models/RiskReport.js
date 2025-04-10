const mongoose = require('mongoose');

const riskReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model for authentication
    required: true,
  },
  rentalHistory: {
    type: Array, // Data from the rental history API (e.g., VeriRent, CUNITED)
    required: true,
  },
  fraudRiskScore: {
    type: Number, // Fraud score calculated based on rental history and other factors
    required: true,
  },
  status: {
    type: String, // e.g., 'Pending', 'Completed', 'Flagged'
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RiskReport = mongoose.model('RiskReport', riskReportSchema);
module.exports = RiskReport;
