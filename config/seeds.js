var mongoose = require('mongoose');
var User = require('../models/user');
var Pet = require('../models/pet');

mongoose.connect('mongodb://localhost:27017/dogPark');
User.collection.drop();
Pet.collection.drop();

User.create([{
  name: "Amalia",
  email: "amalia@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'
},{
  name: "Iris",
  email: "iris@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Christos",
  email: "christos@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Anastasia",
  email: "anastasia@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Diane",
  email: "diane@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Antoine",
  email: "antoine@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Zeynep",
  email: "zeynep@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Noelia",
  email: "noelia@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Rajen",
  email: "rajen@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "John",
  email: "john@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'

},{
  name: "Kevin",
  email: "kevin@gmail.com",
  picture:'http://www.tanmonkey.com/fun/dog-looks-like-owner_files/5_1.jpg'
}], function(err, users){
  if (err) console.error(err);
  Pet.create([{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },
  {
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
    name: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
   name: "Sunny",
   breed: "Cockerspaniel",
   gender: "Female",
   dob: 11/01/2011
  }], function(err, pets){
    if(err) console.error(err);
    console.log(pets, users);
    mongoose.connection.close();
  });
});