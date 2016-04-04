var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
  petname: String,
  petpicture: String,
  breed: String,
  gender: String,
  dob: Date
});

module.exports = mongoose.model('Pet', petSchema);