var mongoose = require('mongoose');
var User = require('../models/user');
var Pet = require('../models/pet');

mongoose.connect('mongodb://localhost:27017/dogPark');
User.collection.drop();
Pet.collection.drop();

User.create([{
  name: "Amalia",
  email: "amalia@gmail.com",
  picture:'https://images.unsplash.com/reserve/UzWklzFdRBSbkRKhEnvc_1-6128.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=8180b9fcead159fd72a92bcfbe69eb69'
},{
  name: "Iris",
  email: "iris@gmail.com",
  picture:'https://images.unsplash.com/photo-1447029080250-270ded608d91?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=11959c3c40d6f8d2f5dc90e84b13e1cc'

},{
  name: "Christos",
  email: "christos@gmail.com",
  picture:'https://images.unsplash.com/photo-1453487977089-77350a275ec5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=5fc4646cb97f0559b241d5f88bc21137'

},{
  name: "Anastasia",
  email: "anastasia@gmail.com",
  picture:'https://images.unsplash.com/photo-1452447224378-04c089d77aa4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=9d13c4eb6dfa4e73b5a56e3e025fe535'

},{
  name: "Diane",
  email: "diane@gmail.com",
  picture:'https://images.unsplash.com/photo-1456534231849-7d5fcd82d77b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=5fafdefd11b8586bf2165ca59201487f'

},{
  name: "Antoine",
  email: "antoine@gmail.com",
  picture:'https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=156cb696287510a0cba671821bd419be'

},{
  name: "Zeynep",
  email: "zeynep@gmail.com",
  picture:'https://images.unsplash.com/uploads/1412433710756bfa9ec14/d568362b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=fd2ccee72a3f42bbd0fe84f920b80efd'

},{
  name: "Noelia",
  email: "noelia@gmail.com",
  picture:'https://images.unsplash.com/photo-1415798408244-83edcac0acca?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=b3090397334cd3cd9f32fe4ca5bbfeb6'

},{
  name: "Rajen",
  email: "rajen@gmail.com",
  picture:'https://images.unsplash.com/photo-1446730853965-62433e868929?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ec9b6f14418a4936b5b0a2e175bd25f3'

},{
  name: "John",
  email: "john@gmail.com",
  picture:'https://images.unsplash.com/photo-1452441271666-5d998aa2f6cc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=080de114ef8fc21bfce4b0bf619793cc'

},{
  name: "Kevin",
  email: "kevin@gmail.com",
  picture:'https://images.unsplash.com/photo-1436990276129-47ab01d4e245?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=834a16309beef1f6f2d3daa3190f7881'
}], function(err, users){
  if (err) console.error(err);
  Pet.create([{
    petname: "Sunny",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },
  {
    petname: "Bailey",
    breed: "Labrador Retriever",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Buddy",
    breed: " Border Terrier",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Daisy",
    breed: "Golden Retriever",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Molly",
    breed: "Pug",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Coco",
    breed: "Boxer",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Ginger",
    breed: "Border Terrier",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Murphy",
    breed: "German Shepherd",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Penny",
    breed: "Boxer",
    gender: "Female",
    dob: 11/01/2011
  },{
    petname: "Honey",
    breed: "Cockerspaniel",
    gender: "Female",
    dob: 11/01/2011
  },{
   petname: "luna",
   breed: "Labrador Retriever",
   gender: "Female",
   dob: 11/01/2011
  }], function(err, pets){
    if(err) console.error(err);
    console.log(pets, users);
    mongoose.connection.close();
  });
});