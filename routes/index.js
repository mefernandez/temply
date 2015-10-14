var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('jumbotron/index.html');
});

router.get('/dash', function(req, res, next) {
  res.render('dashboard/index.html');
});

module.exports = router;
