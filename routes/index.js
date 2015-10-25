var express = require('express');
var router = express.Router();
var pluginLoaderFactory = require('temply-plugin-loader');
var log = require('debug')('temply:index.js');
var path = require('path');
var cheerio = require('cheerio');

var pluginsRepository = [path.join(__dirname, '../plugins/data'), path.join(__dirname, '../plugins/render')];
var pluginLoader = pluginLoaderFactory(pluginsRepository);

router.get('/', function(req, res, next) {
  res.render('jumbotron/index.html');
});

router.get('/control', function(req, res, next) {
  res.render('dashboard/index.html');
});

router.get('/author', function(req, res, next) {
  var options = {
    showTemplateFilePath: true
  };
  res.render('jumbotron-author/index.html', options);
});

router.post('/api/edit', function(req, res, next) {
  // TODO Refactor this code to an external module
  var fs = require('fs');
  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  };
  var data = req.body;
  var id = '#' + data.id;
  var text = data.text;
  var filePath = data.template;
  var html = fs.readFileSync(filePath, readFileOptions);
  var cheerio = require('cheerio');
  var $ = cheerio.load(html);
  var $el = $(id);
  $el.text(text);
  fs.writeFileSync(filePath, $.html());
  res.sendStatus(204);
});

router.post('/api/plugin/cms-render-:pluginName', function(req, res, next) {
  var pluginName = 'cms-render-' + req.params.pluginName;
  var plugin = pluginLoader.loadPlugin(pluginName);
  var html = req.body;
  var $element = cheerio.load(html).root();
  plugin.extract(null, $element, function(data) {
    res.send(201, data);
  });
});

router.post('/api/plugin/cms-data-:pluginName', function(req, res, next) {
  var pluginName = 'cms-data-' + req.params.pluginName;
  var plugin = pluginLoader.loadPlugin(pluginName);
  var data = req.body;
  plugin.save(data, null, function(data) {
    res.sendStatus(201);
  });
});

module.exports = router;
