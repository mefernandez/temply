var assert = require('assert');
var mongodb = require('mongodb');

exports.up = function(db, next) {
  db.collection('tickets').insertMany([{
    "customer": "Customer",
    "ticket_id": "CUS-1",
    "status": "Open",
    "title": "New Ticket 1",
    "worklog": 1,
    "dateCreated": "2015-12-14T12:12:47.901Z"
  }, {
    "customer": "Customer",
    "ticket_id": "CUS-2",
    "status": "Open",
    "title": "New Ticket 2",
    "worklog": 2,
    "dateCreated": "2015-12-14T12:12:47.901Z"
  },{
    "customer": "Customer",
    "ticket_id": "CUS-3",
    "status": "Open",
    "title": "New Ticket 3",
    "worklog": 3,
    "dateCreated": "2015-12-14T12:12:47.901Z"
  }], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    next();
  })

};

exports.down = function(db, next) {
  db.collection('tickets').drop(function(err, result) {
    assert.equal(err, null);
    console.log("Dropped collection tickets");
    next();
  });
};
