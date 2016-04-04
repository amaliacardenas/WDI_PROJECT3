var router = require('express').Router();
var authController = require('../controllers/authentication');
var petsController = require('../controllers/pet');
var usersController = require('../controllers/user');


router.get('/', function(req, res) {
  return res.render('index');
});

router.route('/users')
  //GET all users
  .get(usersController.usersIndex)
  //POST a new pet
  .post(usersController.usersCreate);


router.route('/users/:id')
  // GET return specific pet
  .get(usersController.usersShow)
  // PATCH update existing pet
  .patch(usersController.usersUpdate)
  // DELETE remove pet from DB
  .delete(usersController.usersDelete);

router.route('/pets')
  //GET all pets
  .get(petsController.petsIndex)
  //POST a new pet
  .post(petsController.petsCreate);


router.route('/pets/:id')
  // GET return specific pet
  .get(petsController.petsShow)
  // PATCH update existing pet
  .patch(petsController.petsUpdate)
  // DELETE remove pet from DB
  .delete(petsController.petsDelete);


router.post('/auth/facebook', authController.facebook);
module.exports = router;
