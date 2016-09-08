/**
 * Created by george on 7/27/16.
 */
var express = require('express');
var router = express.Router();
var Items = require('../models/items');

router.get('/items', function(req, res, next) {
    Items.find().sort('updated').exec(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/items', function(req, res, next) {
    req.body.created = new Date();
    req.body.updated = req.body.created;
    Items.create(
       req.body
    , function (err, data) {
        console.log ('In posttt: ', err);
        if (err)
            res.send(err);
    });

});

router.put('/items/:_id', function(req, res) {
    delete req.body._id;
    req.body.updated = new Date();
    Items.findByIdAndUpdate(req.params._id, {$set: req.body}, function(err, data){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + data);
        res.json(data);
    });
});

router.get('/items/:_id', function(req, res) {
    Items.findById(req.params._id, function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });

});

router.delete('/items/:_id', function(req, res) {
    Items.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);

        res.json({ message: 'Removed!' });

    });


});

module.exports = router;