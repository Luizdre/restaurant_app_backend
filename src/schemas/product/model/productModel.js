const mongoose = require('../../../database/index')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    supplies: {
        type: Array,
        require: true
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;