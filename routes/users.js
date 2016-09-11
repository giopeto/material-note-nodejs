var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = new csrf();

router.use(csrfProtection);

/* GET users listing. */
router.get('/users/signup', function(req, res, next) {
  var messages = req.flash('error');
  console.log(req.flash('error'));
  //var messages = [];

  //res.json({messages: messages, csrfToken: 123});
  res.json({messages: messages, csrfToken: req.csrfToken()});
});

router.get('/users/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.json({messages: messages, csrfToken: req.csrfToken()});
});


router.post('/users/signup', passport.authenticate('local.signup', {
  successRedirect : 'profile', // redirect to the secure profile section
  failureRedirect : 'fail', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

/*
router.post('/users/signin', function(req, res, next) {
    passport.authenticate('local.signin', function (nullParam, user, messages) {
      console.log (req);
      console.log (res);
      res.json({user: res, messages: messages});
    });
});
*/


router.post('/users/signin', function(req, res, next) {
  passport.authenticate('local.signin', function(err, user, messages) {
    if (err) { return next(err); }
    // Redirect if it fails
    if (!user) {return res.json({messages: messages});}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // Redirect if it succeeds
      if (user) {
        console.log ("11111111111111111: ", user);
        return res.json(user);
      } else {
        console.log ("22222222222: ", user);
        return res.json({messages: messages});
      }

    });
  })(req, res, next);
});












router.get('/users/profile', function(req, res, next) {
  res.json([{a: 'Profile'}]);
});

router.get('/users/fail', function(req, res, next) {
  res.send(401);
});

module.exports = router;
