var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('jumbotron/index.html');
});

router.get('/control', function(req, res, next) {
  res.render('dashboard/index.html');
});

router.get('/author', function(req, res, next) {
  res.render('jumbotron-author/index.html');
});

module.exports = router;
