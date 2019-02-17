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
	image1: {
		type: String,
		required: false,
	},
	image2: {
		type: String,
		required: false,
	},
	image3: {
		type: String,
		required: false,
	},
	employeeApproval : {
		type: Boolean,
		required: false,
	},
	managerApproval : {
		type: Boolean,
		required: false,
	},
	notifications: {
		type: String,
		required: false
	}
});


module.exports = mongoose.model("User", SignupSchema);;