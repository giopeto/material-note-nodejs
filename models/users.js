var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
		name : {type : String, default: ''},
		email : {type : String, default: ''},
		passport: {type : String, default: ''},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Users', usersSchema);


