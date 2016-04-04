var mongoose = require('mongoose');
var Pet = require('./pet.js');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  facebookId: String,
  pets : [{ type: mongoose.Schema.ObjectId, ref: 'Pet'}]
});

module.exports = mongoose.model('User', userSchema);