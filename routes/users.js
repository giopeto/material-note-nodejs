var express = require('express');
var router = express.Router();

var csrf = require('csurf');

var csrfProtection = new csrf();

router.use(csrfProtection);

/* GET users listing. */
router.get('/users/signup', function(req, res, next) {
  res.json([{bb: 'respond with a resource', csrfToken: req.csrfToken()}]);
});

router.post('/users/signup', function(req, res, next) {
  res.json({});
});

module.exports = router;
