const dependable = require('dependable');
const path = require('path');
const fs=require('fs');

const container = dependable.container();

const simpleDependecies = [
    ['_', 'lodash'],
    ['passport', 'passport'],
    ['formidable', 'formidable'],
    ['async', 'async'], 
    ['Club', './models/clubs'],
    ['Users', './models/user'],
    ['Message', './models/message'],
    ['Black', './models/blacklist'],
    ['Group', './models/groupmessage'],
    ['Ad', './models/ads.js'],
    ['aws', './helpers/AWSUpload']
];

simpleDependecies.forEach(function(val){
   container.register(val[0], function(){
       return require(val[1]);
   }) 
});

container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

container.register('container', function(){
    return container;
});

module.exports = container;
















