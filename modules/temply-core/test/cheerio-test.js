var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var _ = require('lodash');

describe('Cheerio', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  var filePath = path.join(__dirname, 'template-04.html');
  var html = fs.readFileSync(filePath, readFileOptions);

  it('should find 6 HTML elements containing cms-*', function() {
    var $ = cheerio.load(html);
    var elements = $('[class*="cms-"]');
    expect(elements).to.have.length(6);
  });

  it('should traverse all HTML elements containing cms-* in pre-order', function() {
    var $ = cheerio.load(html);
    var elements = $('[class*="cms-"]');
    var elementIds = _.map(elements, function(el) {
      return $(el).attr('id');
    });
    var expected = ['div-1','p-1','div-2','p-2','div-3','p-3'];
    expect(elementIds).to.deep.equal(expected);
  });

  it('should find all cms-* plugins in pre-order', function() {
    var $ = cheerio.load(html);
    var elements = $('[class*="cms-"]');
    var plugins = _.chain(elements)
      .map(function(el) {
        var clazz = $(el).attr('class');
        var plugins = clazz.split(' ');
        return plugins;
      })
      .flatten()
      .value();
    var expected = ['cms-data-1','cms-data-2','cms-render-1','cms-render-2','cms-data-3','cms-data-4','cms-render-3','cms-render-4','cms-data-5','cms-data-6','cms-render-5','cms-render-6'];
    expect(plugins).to.deep.equal(expected);
  });

});