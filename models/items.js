var mongoose = require('mongoose');

module.exports = mongoose.model('Items', {
    name : {type : String, default: ''},
    description : {type : String, default: ''},
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Groups' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});