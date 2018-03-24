const mongoose = require('mongoose');

const clubNames = mongoose.Schema({
    class: {type: String, default: ''},
    stream: { type: String, default: '' }, //country
    image: {type: String, default: 'default.png'},
    student: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Club', clubNames);