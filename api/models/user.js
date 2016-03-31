var mongoose = require('mongoose');
var Pet = require('./pet.js');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  facebookId: String,
  pets : [{'type' : mongoose.Schema.Types.ObjectId,
           'ref' : 'petSchema'
         }]
});

module.exports = mongoose.model('User', userSchema);