var expect = require('chai').expect;
var engineFactory = require('../temply-express');
var path = require('path');

describe('temply-express', function() {
  var engine = engineFactory();

  it('should export a function', function() {
    expect(engine).to.be.a('function');
  });

  it('should add a meta tag pointing to the template file path when showTemplateFilePath is true ', function(done) {

    var options = {
      showTemplateFilePath: true
    };

    var filePath = path.join(__dirname, './template.html');
    
    engine(filePath, options, function(err, html) {
      expect(html).to.contain('<meta name="temply-template-path" content="' + filePath + '">');
      done();
    });
  });

  it('should NOT add a meta tag pointing to the template file path when showTemplateFilePath is false ', function(done) {

    var options = {
      showTemplateFilePath: false
    };

    var filePath = path.join(__dirname, './template.html');
    
    engine(filePath, options, function(err, html) {
      expect(html).to.not.contain('<meta name="temply-template-path" content="');
      done();
    });
  });

  it('should NOT add a meta tag pointing to the template file path when showTemplateFilePath is undefined ', function(done) {

    var options = {
    };

    var filePath = path.join(__dirname, './template.html');
    
    engine(filePath, options, function(err, html) {
      expect(html).to.not.contain('<meta name="temply-template-path" content="');
      done();
    });
  });

  it('should NOT add a meta tag pointing to the template file path when no options are provided', function(done) {

    var filePath = path.join(__dirname, './template.html');
    
    engine(filePath, null, function(err, html) {
      expect(html).to.not.contain('<meta name="temply-template-path" content="');
      done();
    });
  });

});
