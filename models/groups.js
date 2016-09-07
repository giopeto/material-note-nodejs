var mongoose = require('mongoose');

module.exports = mongoose.model('Groups', {
    name : {type : String, default: ''}
});