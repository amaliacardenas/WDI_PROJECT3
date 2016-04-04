var Pet = require("../models/pet");
var User = require("../models/user");

function petsIndex(req, res){
  Pet.find({}, function(err, pets) {
    if (err) return res.status(404).send(err);

    res.status(200).send(pets);
  });
}

// create pet and push into a user's pets

function petsCreate(req, res){
  var pet = new Pet(req.body.pet);
  pet.save(function(err){
    if (err) return res.status(500).send(err);
    console.log(req.body.userId);
    User.findById(req.body.userId, function(err, user){
      user.pets.push(pet);
      user.save(function(user) {
        res.status(201).send(pet)
      });
    });
  });
}

function petsShow(req, res){
  var id = req.params.id;

  Pet.findById({ _id: id }, function(err, pet) {
    if (err) return res.status(500).send(err);
    if (!pet) return res.status(404).send(err);

    res.status(200).send(pet);
  })
}

function petsUpdate(req, res){
  var id = req.params.id;
  console.log(req.body);
  Pet.findByIdAndUpdate({ _id: id }, req.body, function(err, pet){
    if (err) return res.status(500).send(err);
    if (!pet) return res.status(404).send(err);

    res.status(200).send(pet);
  })
}

function petsDelete(req, res){
  var id = req.params.id;

  Pet.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send('done');
  })
}

module.exports = {
  petsIndex:  petsIndex,
  petsCreate: petsCreate,
  petsShow:   petsShow,
  petsUpdate: petsUpdate,
  petsDelete: petsDelete
}