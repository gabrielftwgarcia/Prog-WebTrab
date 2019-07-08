var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://admin:password1@ds139427.mlab.com:39427/heroku_gw46d2k3';

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.render('testShowProduct');
});*/

// UMA MANEIRA DE CONSEGUIR JSON DO BANCO
router.get('/', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('heroku_gw46d2k3');
    var cursor = db.collection('products').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
      console.log(doc);
    }, function () {
      client.close();
      res.render('products-json', { products: resultArray });
    });
  });
});

module.exports = router;
