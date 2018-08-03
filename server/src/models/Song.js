const mongoose = require('mongoose');
const {Schema} = mongoose;

const SongSchema = new Schema({
  title: String
});

module.exports = mongoose.model('Song',SongSchema);