const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
	firstName: String,
	age: Number,
	companyId: String
});

module.exports = mongoose.model('User',UserSchema);