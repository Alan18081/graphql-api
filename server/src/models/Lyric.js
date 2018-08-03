const mongoose = require('mongoose');
const {Schema} = mongoose;

const LyricSchema = new Schema({
  content: String,
  songId: Schema.ObjectId
});

module.exports = mongoose.model('Song',LyricSchema);