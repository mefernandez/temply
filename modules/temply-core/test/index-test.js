var expect = require('chai').expect;
var path = require('path');
var templyFactory = require('../index');

describe('Temply', function() {

  var temply = templyFactory();

  it('should export a render function', function() {
    expect(temply.render).to.be.a('function');
  });

  it('should return an error for a non-existing template file', function(done) {
    var filePath = 'undefined.html';
    var options = {};
    temply.render(filePath, options, function (err, rendered) {
      expect(err).to.be.an('Error');
      expect(rendered).to.be.undefined;
      done();
    });
  });

  it('should render a template file as a string', function(done) {
    var filePath = path.join(__dirname, 'template-01.html');
    var options = {};
    temply.render(filePath, options, function (err, rendered) {
      expect(err).to.be.null;
      expect(rendered).to.be.a('string');
      expect(rendered).to.equal('Found template-01.html');
      done();
    });
  });

});
