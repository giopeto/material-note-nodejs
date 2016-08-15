var mongoose = require('mongoose');

module.exports = mongoose.model('Note', {
    name : {type : String, default: ''}
});