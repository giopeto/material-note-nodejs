var express = require('express');
var router = express.Router();
var Category = require('../models/groups');

/* GET category listing. */
router.get('/groups', function(req, res, data) {

    Category.find(function(err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/groups', function(req, res, next) {


    Category.create({
        name: req.body.name,
    }, function (err, todo) {
        console.log ('In posttt: ', err);
        if (err)
            res.send(err);

        res.json({ message: 'Updated!' });
    });

});



router.put('/groups/:_id', function(req, res) {

    Category.findById(req.params._id, function(err, data) {

        if (err)
            res.send(err);

        data.name = req.body.name;

        data.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Updated!' });
        });

    });

});

router.get('/groups/:_id', function(req, res) {
    console.log ("HEREE");
    Category.findById(req.params._id, function(err, data) {

        if (err)
            res.send(err);
        res.json(data);


    });

});


router.delete('/groups/:_id', function(req, res) {
    Category.remove({
        _id: req.params._id
    }, function (err, data) {
        if (err)
            res.send(err);

        res.json({ message: 'Removed!' });

    });


});



module.exports = router;