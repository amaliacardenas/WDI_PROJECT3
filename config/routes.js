var router = require('express').Router();
var authController = require('../controllers/authentication');


router.get('/', function(req, res) {
  return res.render('index');
});

router.post('/auth/facebook', authController.facebook);
module.exports = router;