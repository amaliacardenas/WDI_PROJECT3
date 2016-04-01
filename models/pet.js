var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
  name: String,
  picture: String,
  breed: String,
  gender: String,
  dob: Date
});

module.exports = mongoose.model('Pet', petSchema);