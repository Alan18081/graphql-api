const mongoose = require('mongoose');
const {Schema} = mongoose;

const CompanySchema = new Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Company',CompanySchema);