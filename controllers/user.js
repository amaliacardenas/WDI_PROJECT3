var User = require("../models/user");

function usersIndex(req, res){
  User.find().populate('pets').exec(function(err, users) {
    if (err) return res.status(404).send(err);

    res.status(200).send(users);
  });
}

function usersCreate(req, res){
  var user = new User(req.body);

  user.save(function(err, user) {
    if (err) return res.status(500).send(err);

    res.status(201).send(user)
  })
}

function usersShow(req, res){
  var id = req.params.id;

  User.findById(id).populate('pets').exec(function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);

    res.status(200).send(user);
  })
}

function usersUpdate(req, res){
  var id = req.params.id;


  
  User.findByIdAndUpdate({ _id: id }, req.body, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);

    res.status(200).send(user);
  })
}

function usersDelete(req, res){
  var id = req.params.id;

  User.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send('done');
  })
}

module.exports = {
  usersIndex:  usersIndex,
  usersCreate: usersCreate,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
}