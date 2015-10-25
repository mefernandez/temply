var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var engineFactory = require('../temply-core');
var log = require('debug')('engine-test');

describe('The plugin engine', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  it('should skip plugins not found', function(done) {
    var filePath = path.join(__dirname, 'template-08.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);
    var model = engine.build(html);
    expect(model.plugins).to.have.length(1);
    done();
  });

  it('should render a model which contains cms-data and cms-render plugins which export extract and save functions', function(done) {
    var engine = engineFactory();
    var savedContent = '';
    var model = {
      $html: {
        html: function() {
          return 'HTML';
        }
      },
      plugins: [
        {
          plugin: {
            instance: require('./plugins/data/cms-data-load-save'),
            $element: {
              text: function(content) {
                savedContent = content;
              }
            }
          }
        },
        {
          plugin: {
            instance: require('./plugins/render/cms-render-extract'),
            $element: {
              text: function(content) {
                savedContent = content;
              }
            }
          }
        }
      ]
    };
    engine.render(model, function(render) {
      expect(savedContent).to.equal('Lorem ipsum dolor sit amet');
      done();
    })
  });

  describe('should build an execution model from template-04.html', function() {

    var filePath = path.join(__dirname, 'template-04.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/dummy')];
    var engine = engineFactory(pluginsRepository);

    it('which contains 12 plugins', function() {
      var model = engine.build(html);
      expect(model.plugins).to.have.length(12);
    });

    it('which contains all plugin names in pre-order', function() {
      var model = engine.build(html);
      var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
      var plugins = _.map(model.plugins, function(modelItem) {return modelItem.plugin.name});
      expect(plugins).to.deep.equal(expected);
    });

    it('which contains all plugin instances already loaded', function() {
      var model = engine.build(html);
      var instances = _.map(model.plugins, function(modelItem) {return modelItem.plugin.instance});
      _.each(instances, function(instance) {
        expect(instance).to.be.ok;
      });
    });

    it('which contains all HTML elements for declared plugins', function() {
      var model = engine.build(html);
      var $elements = _.map(model.plugins, function(modelItem) {return modelItem.plugin.$element});
      _.each($elements, function($el) {
        expect($el).to.be.ok;
      });
    });

  });

  describe('should build an execution model from template-05.html', function() {
    var filePath = path.join(__dirname, 'template-05.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var options = {
      filterUnknownPlugins: false
    };
    var engine = engineFactory(pluginsRepository, options);

    it('which filters out non-plugin class values', function() {
      var model = engine.build(html);
      var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
      var plugins = _.map(model.plugins, function(modelItem) {return modelItem.plugin.name});
      expect(plugins).to.deep.equal(expected);
    });
  });

  describe('given an execution model built from template-06.html', function() {
    var filePath = path.join(__dirname, 'template-06.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);

    it('should call all plugins and render a result', function(done) {
      var model = engine.build(html);
      engine.render(model, function(html) {
        var expected = fs.readFileSync(path.join(__dirname, 'template-06-result.html'), readFileOptions);
        expect(html).to.equal(expected);
        done();
      });
    });

  });

  describe('given an execution model built from template-07.html', function() {
    var filePath = path.join(__dirname, 'template-07.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);

    it('should call all plugins and render a result', function(done) {
      var model = engine.build(html);
      engine.render(model, function(html) {
        var expected = fs.readFileSync(path.join(__dirname, 'template-07-result.html'), readFileOptions);
        expect(html).to.equal(expected);
        done();
      });
    });

    it('should render the same model twice', function(done) {
      var model = engine.build(html);
      engine.render(model, function(html) {
        var expected = fs.readFileSync(path.join(__dirname, 'template-07-result.html'), readFileOptions);
        expect(html).to.equal(expected);
        engine.render(model, function(html) {
          var expected = fs.readFileSync(path.join(__dirname, 'template-07-result.html'), readFileOptions);
          expect(html).to.equal(expected);
          done();
        });
      });
    });

  });

});

