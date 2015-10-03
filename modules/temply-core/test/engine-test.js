var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var engineFactory = require('../engine');

describe('The plugin engine', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  describe('should build an execution model from template-04.html', function() {

    var filePath = path.join(__dirname, 'template-04.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/dummy')];
    var engine = engineFactory(pluginsRepository);

    it('which contains 12 plugins', function() {
      var model = engine.build(html);
      expect(model).to.have.length(12);
    });

    it('which contains all plugin names in pre-order', function() {
      var model = engine.build(html);
      var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
      var plugins = _.map(model, function(modelItem) {return modelItem.plugin.name});
      expect(plugins).to.deep.equal(expected);
    });

    it('which contains all plugin instances already loaded', function() {
      var model = engine.build(html);
      var instances = _.map(model, function(modelItem) {return modelItem.plugin.instance});
      _.each(instances, function(instance) {
        expect(instance).to.be.ok;
      });
    });


  });

  describe('should build an execution model from template-05.html', function() {
    var filePath = path.join(__dirname, 'template-05.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);

    it('which filters out non-plugin class values', function() {
      var model = engine.build(html);
      var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
      var plugins = _.map(model, function(modelItem) {return modelItem.plugin.name});
      expect(plugins).to.deep.equal(expected);
    });
  });

  describe('given an execution model built from template-04.html', function() {
    var filePath = path.join(__dirname, 'template-04.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);

    it('should call and pipe all plugins in pre-order', function() {
      var model = engine.build(html);
      var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
      var plugins = _.map(model, function(modelItem) {return modelItem.plugin.name});
      expect(plugins).to.deep.equal(expected);
    });

  });

});

