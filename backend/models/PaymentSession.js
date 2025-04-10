const mongoose = require('mongoose');

const paymentSessionSchema = new mongoose.Schema({
  userId: String,
  sessionId: String,
  reportId: String,
  amount: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PaymentSession', paymentSessionSchema);
