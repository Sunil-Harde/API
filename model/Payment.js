const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: Number,
    status: {
        type: String,
        default: 'success'
    }
});

module.exports = mongoose.model('Payment', paymentSchema);