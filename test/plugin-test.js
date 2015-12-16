var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var _ = require('lodash');

describe('Plugins', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  it('should not break if no data and no $element is passed', function(done) {
    // TODO Visit all plugins
    var plugin = require('../plugins/render/cms-render-rss-feed');
    var data = null;
    var $element = {};
    plugin(null, null, function() {
      done();
    });
  });

});