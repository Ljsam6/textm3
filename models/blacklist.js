const mongoose = require('mongoose');

var blackList = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: { type: String },
    name: { type: String },
    userName:{type:String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlackList', blackList);