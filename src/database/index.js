const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.nbiem.mongodb.net/restaurant');
mongoose.Promise = global.Promise;

module.exports = mongoose;