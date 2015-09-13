var expect = require('chai').expect;
var engine = require('../index');

describe('Engine', function() {
  it('should export a function', function() {
    expect(engine).to.be.a('function');
  });
});
