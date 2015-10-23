var express = require('express');
var router = express.Router();
var log = require('debug')('index.js');

router.get('/', function(req, res, next) {
  res.render('jumbotron/index.html');
});

router.get('/control', function(req, res, next) {
  res.render('dashboard/index.html');
});

router.get('/author', function(req, res, next) {
  res.render('jumbotron-author/index.html');
});

router.post('/api/edit', function(req, res, next) {
  var fs = require('fs');
  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  };
  var path = require('path');
  var filePath = path.join(__dirname, '../template/jumbotron-author/index.html');
  var html = fs.readFileSync(filePath, readFileOptions);
  var cheerio = require('cheerio');
  var $ = cheerio.load(html);
  var data = req.body;
  var id = '#' + data.id;
  var text = data.text;
  var $el = $(id);
  $el.text(text);
  fs.writeFileSync(filePath, $.html());
  res.send(204);
});

module.exports = router;
