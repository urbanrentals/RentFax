const RiskReport = require('../models/RiskReport');
const { fetchRentalHistory } = require('../services/rentalHistoryAPI');

// Submit a new risk report
exports.submitReport = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch rental history using the external API
    const rentalHistory = await fetchRentalHistory(userId);
    
    // Calculate fraud risk score
    const fraudRiskScore = calculateFraudRiskScore(rentalHistory);
    
    // Create new risk report
    const newReport = new RiskReport({
      userId,
      rentalHistory,
      fraudRiskScore,
    });
    
    await newReport.save();
    
    res.status(201).json({ message: 'Report submitted successfully', report: newReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting report' });
  }
};

// Helper function for calculating fraud risk score
function calculateFraudRiskScore(rentalHistory) {
  let score = 0;
  rentalHistory.forEach(rental => {
    if (rental.status === 'late') {
      score += 5;
    }
    if (rental.flaggedForFraud) {
      score += 10;
    }
  });
  return score;
}
