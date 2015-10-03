var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var engineFactory = require('../engine');

describe('The plugin engine', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  // Expected model (kind of)
  var expected = {
    html: 'html',
    plugins: [
      {
        name: 'cms-data-rss-feed',
        plugin: {},
        element: {},
        children: [
          {
            name: 'cms-render-rss-article',
            plugin: {/* The plugin instance */},
            element: { /* The HTML element */ }
          },
          {
            name: 'cms-render-rss-article',
            plugin: {},
            element: {}
          }
        ]
      }
    ]
  };

  describe('builds an execution model from template-02.html with 1 cms-data and 2 cms-render plugins', function() {
    var filePath = path.join(__dirname, 'template-02.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);
    var model = engine.build(html);

    it('should have the HTML the model is built upon', function() {
      expect(model.html).to.equal(html);
    });
    it('should have the data plugin name', function() {
      expect(model.plugins[0].name).to.equal('cms-data-rss-feed');
    });
    it('should have a reference to the data plugin HTML element', function() {
      expect(model.plugins[0].element.attr('id')).to.equal('div-1');
    });
    it('should have a reference to the data plugin instance', function() {
      expect(model.plugins[0].plugin).to.equal(require('./plugins/data/cms-data-rss-feed'));
    });
    it('should have 2 children', function() {
      expect(model.plugins[0].children).to.have.length(2);
    });
    it('should have cms-render-rss-article as the 1st child', function() {
      expect(model.plugins[0].children[0].name).to.equal('cms-render-rss-feed-article');
    });
    it('should have a reference to the render plugin HTML element as the 1st child', function() {
      expect(model.plugins[0].children[0].element.attr('id')).to.equal('p-1');
    });
    it('should have a reference to the render plugin instance as the 1st child', function() {
      expect(model.plugins[0].children[0].plugin).to.equal(require('./plugins/render/cms-render-rss-feed-article'));
    });
    it('should have cms-render-rss-article as the 2nd child', function() {
      expect(model.plugins[0].children[1].name).to.equal('cms-render-rss-feed-article');
    });
    it('should have a reference to the render plugin HTML element as the 2nd child', function() {
      expect(model.plugins[0].children[1].element.attr('id')).to.equal('p-2');
    });
    it('should have a reference to the render plugin instance as the 2nd child', function() {
      expect(model.plugins[0].children[1].plugin).to.equal(require('./plugins/render/cms-render-rss-feed-article'));
    });
  });

  describe('with a model', function() {
    var filePath = path.join(__dirname, 'template-02.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var engine = engineFactory(pluginsRepository);
    var model = engine.build(html);

    it('should execute model plugins and render an HTML', function() {
      var filePath = path.join(__dirname, 'template-02-output.html');
      var html = fs.readFileSync(filePath, readFileOptions);
      var output = engine.render(model);
      expect(output).to.equal(expected);
    });


  });


});


