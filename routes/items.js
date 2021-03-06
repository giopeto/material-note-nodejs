/**
 * Created by george on 7/27/16.
 */
var express = require('express');
var router = express.Router();
var Items = require('../models/items');

router.get('/items', function(req, res, next) {

    var groupId = req.query.groupId;
    var qStr = "";
    if (groupId) {
        qStr = {_group: groupId};
    }

    Items.find(qStr).sort('updated').populate("_group").exec(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/items', function(req, res, next) {
    var mongoose = require('mongoose');
	var ObjectId = require('mongodb').ObjectId;

    if (!req.body._group) {
        req.body._group = new ObjectId("57de3ef8a916e1ac15f031d5");
    }

    Items.create(
       req.body
    , function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });

});

router.put('/items/:_id', function(req, res) {
    delete req.body._id;
    Items.findByIdAndUpdate(req.params._id, {$set: req.body}, function(err, data){
        if(err){
            res.send(err);
        }
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