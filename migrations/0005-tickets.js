var assert = require('assert');
var mongodb = require('mongodb');

exports.up = function(db, next) {
  db.collection('tickets').insertMany([{
    a: 1
  }, {
    a: 2
  }, {
    a: 3
  }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    next();
  })

};

exports.down = function(db, next) {
  db.drop('tickets');
  next();
};
