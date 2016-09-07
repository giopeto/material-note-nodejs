/**
 * Created by george on 7/27/16.
 */
var express = require('express');
var router = express.Router();
var Items = require('../models/items');

/* GET note listing. */
router.get('/items', function(req, res, next) {
    Items.find(function(err, data) {

        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(data); // return all note in JSON format
    });
});

router.post('/items', function(req, res, next) {


    Items.create({
        name: req.body.name,
    }, function (err, todo) {
        console.log ('In posttt: ', err);
        if (err)
            res.send(err);
    });

});

module.exports = router;