var expect = require('chai').expect;
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var engineFactory = require('../temply-core');

describe('A plugin', function() {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  describe('of type data', function() {

    it('should take a callback and call it', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      plugin(null, null, function() {
        done();
      });
    });

    it('should take no data and a callback and call it passing some data', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      plugin(null, null, function(data) {
        expect(data).to.be.ok;
        done();
      });
    });

    it('should take some data and pass it to the callback', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      var pluginData = [];
      plugin(pluginData, null, function(data) {
        expect(data).to.equal(pluginData);
        done();
      });
    });

    it('should chain two plugin calls adding two item to data array', function(done) {
      var plugin = require('./plugins/proto/cms-data-plugin');
      plugin([], null, function(data) {
        plugin(data, null, function(data) {
          expect(data).to.have.length(2);
          done();          
        });
      });
    });

  });

  describe('of type render', function() {
    // TODO
  });

});

