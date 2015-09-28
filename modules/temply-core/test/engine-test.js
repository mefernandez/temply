var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var engineFactory = require('../engine');

describe('The plugin engine builds an execution model', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  // Expected model (kind of)
  var expected = [
    {
      name: 'cms-data-rss-feed',
      plugin: {},
      element: {},
      children: [
        {
          name: 'cms-render-rss-article',
          plugin: {},
          element: {}
        },
        {
          name: 'cms-render-rss-article',
          plugin: {},
          element: {}
        }
      ]
    }
  ];

  describe('from template-02.html with 1 cms-data and 2 cms-render plugins', function() {
    var filePath = path.join(__dirname, 'template-02.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = path.join(__dirname, 'plugins/data');
    var engine = engineFactory(pluginsRepository);
    var model = engine.build(html);

    it('should have the data plugin name', function() {
      expect(model[0].name).to.equal('cms-data-rss-feed');
    });
    it('should have a reference to the data plugin HTML element', function() {
      expect(model[0].element.attr('id')).to.equal('div-1');
    });
    it('should have a reference to the data plugin instance', function() {
      expect(model[0].plugin).to.equal(require('./plugins/data/cms-data-rss-feed'));
    });
    it('should have 2 children', function() {
      expect(model[0].children).to.have.length(2);
    });
    it('should have cms-render-rss-article as the first children', function() {
      expect(model[0].children[0].name).to.equal('cms-render-rss-feed-article');
    });

  });

});


