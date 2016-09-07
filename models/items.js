var mongoose = require('mongoose');

module.exports = mongoose.model('Items', {
    name : {type : String, default: ''}
});