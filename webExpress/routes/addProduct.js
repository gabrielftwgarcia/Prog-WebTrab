var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url =  'mongodb://localhost:27017';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('addProduct', { title: 'Express' });
});

/* INUTIL
router.get('/get-product', function(req, res, next){
    var resultArray = [];
    mongo.connect(url, function(err, db){
        var cursor = db.colletion('products').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('')
        });
    });
});*/

router.post('/insert', function(req, res, next){
    var product ={
        description: req.body.description,
        image:  req.body.image
    };

    mongo.connect(url,{ useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        var db = client.db('projeto2Web');
        db.collection('products').insertOne(product, function(err, result){
            assert.equal(null, err);
            console.log('Produto Adicionado, fechando o bando de dados')
            client.close();
            res.render('');
        });
    });
});

module.exports = router;
