const mongoose = require('../../../database/index')

const OrderSchema = new mongoose.Schema({
    clientName: {
        type: String,
        require: true
    },
    totalPrice: {
        type: String,
        require: true
    },
    products: {
        type: Array,
        require: true
    },
    obs: {
        type: String
    },
    payment: {
        type: String,
        require: true
    },
    status:{
        type: String,
        default: 'New'
    },
    payd: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;