var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url =  'mongodb://admin:password1@ds139427.mlab.com:39427/heroku_gw46d2k3'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// UMA MANEIRA DE CONSEGUIR JSON DO BANCO
router.get('/db', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('heroku_gw46d2k3');
    var collection = db.collection('products')
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      // UTILIZAR O DOCS PARA CRIAR UM TXT/JSON QUE O XMLHTTPR PEGARIA DO SERVIDOR
    }, function () {
      client.close();
      res.redirect('/');
    });
  });
});

/*
router.get('/db', function (req, res, next) {
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('projeto2Web');
    var cursor = db.collection('products').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
      console.log(" --------------\n" + resultArray);

    }, function () {
      client.close();
      res.render('index', { products: resultArray });
    });
  });
});
*/

/*
router.post('/busca', function (req, res, next) {
  var searchText = req.body.search;
  console.log(searchText);
  var resultArray = [];
  mongo.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    var db = client.db('heroku_gw46d2k3');
    if(String(searchText) == ''){
      var cursor = db.collection('products').find();
    }else{
      var cursor = db.collection('products').find({"description": String(searchText)});
    }
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      client.close();
      res.render('index', { products: resultArray });
    });
  });
});*/
module.exports = router;

