/**
 * Created by george on 7/27/16.
 */
var express = require('express');
var router = express.Router();
var Note = require('../models/note');

/* GET note listing. */
router.get('/noteController', function(req, res, next) {
    Note.find(function(err, data) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(data); // return all note in JSON format
    });
});

router.post('/noteController', function(req, res, next) {


    Note.create({
        name: req.body.name,
    }, function (err, todo) {
        console.log ('In posttt: ', err);
        if (err)
            res.send(err);
    });

});

module.exports = router;