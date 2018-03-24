const mongoose = require('mongoose');

const ads = mongoose.Schema({
    image: { type: String, default: ' ' },
    
});
module.exports = mongoose.model('Ad', ads);