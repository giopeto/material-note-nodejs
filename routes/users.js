var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = new csrf();

router.use(csrfProtection);

/* GET users listing. */
router.get('/users/signup', function(req, res, next) {
  var messages = req.flash('error');
  //var messages = [];

  //res.json({messages: messages, csrfToken: 123});
  res.json({messages: messages, csrfToken: req.csrfToken()});
});



router.post('/users/signup', passport.authenticate('local.signup', {
  successRedirect : 'profile', // redirect to the secure profile section
  failureRedirect : 'signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

router.get('/users/profile', function(req, res, next) {
  res.json([{a: 'Profile'}]);
});

module.exports = router;
