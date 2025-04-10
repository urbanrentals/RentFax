const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    amount: Number,
    method: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
