const mongoose = require('../../../database/index');

const SuppliesSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    }
});

const Supplies = mongoose.model('Supplies', SuppliesSchema);

module.exports = Supplies;