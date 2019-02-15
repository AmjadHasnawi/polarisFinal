const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignupSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
    },
    profession:{
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false,
		default:'https://www.eigenheimreal.com/avatar_mann.png'
	}
});


module.exports = mongoose.model("User", SignupSchema);;