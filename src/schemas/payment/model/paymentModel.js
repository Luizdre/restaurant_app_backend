const mongoose = require('../../../database/index');

const PaymentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;