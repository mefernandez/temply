var express = require('express');
var router = express.Router();
//var temply = require('temply');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index.html');
});

module.exports = router;
