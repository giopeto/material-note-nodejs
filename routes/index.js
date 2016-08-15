var express = require('express');
var router = express.Router();

var Note = require('../models/note');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Material note' });
});



/* GET home page. */
router.get('/categoryController', function(req, res, next) {
  Note.find(function(err, data) {

    // if there is an error retrieving, send the error.
    // nothing after res.send(err) will execute
    if (err)
      res.send(err);

    res.json(data); // return all nerds in JSON format
  });
});


module.exports = router;
