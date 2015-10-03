var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var engineFactory = require('../engine');

describe('A plugin', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  describe('of type data', function() {

    var filePath = path.join(__dirname, 'template-04.html');
    var html = fs.readFileSync(filePath, readFileOptions);
    var pluginsRepository = [path.join(__dirname, 'plugins/dummy')];
    var engine = engineFactory(pluginsRepository);

    it('should take a callback and call it', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      plugin(function() {
        done();
      });
    });

    it('should take a callback and call it passing some data', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      plugin(function(data) {
        expect(data).to.be.ok;
        done();
      });
    });
  });

});

