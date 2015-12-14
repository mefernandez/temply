var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var _ = require('lodash');

describe('cms-data-tickets', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  it('should return a list of tickets', function(done) {
    // TODO Visit all plugins
    var plugin = require('../plugins/data/cms-data-tickets');
    var data = null;
    var $element = {};
    plugin(null, null, function(data) {
      expect(data.contents).to.have.length(3);
      done();
    });
  });

  it('should return page info', function(done) {
    // TODO Visit all plugins
    var plugin = require('../plugins/data/cms-data-tickets');
    var data = null;
    var $element = {};
    plugin(null, null, function(data) {
      expect(data.page.current).to.equal(1);
      expect(data.page.size).to.equal(3);
      expect(data.page.total).to.equal(3);
      done();
    });
  });

});
