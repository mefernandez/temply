'use strict';

var request = require('supertest');
var app = require('../app');
var expect = require('chai').expect;

describe('GET Home', function(){
  it('should take less than 50ms', function(done) {
    var a = new Date().getTime();
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        var b = new Date().getTime();
        var c = b - a;
        expect(c).to.be.below(50);
        done();
      });
  })
})
