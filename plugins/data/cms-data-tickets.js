'use strict';

var request = require('superagent');
var parseString = require('xml2js').parseString;
var _ = require('lodash');
var log = require('debug')('temply:cms-data-tickets');

// @see http://mongodb.github.io/node-mongodb-native/2.1/getting-started/quick-tour/
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

/**
 * List tickets using MongoDb
 * @see http://mongoosejs.com/docs/index.html
 */
module.exports = function(data, $element, callback) {
  /*
  var data = {
    "contents": [{
      "_id": "asdf234798",
      "customer": "Customer",
      "ticket_id": "CUS-1",
      "status": "Open",
      "title": "New Ticket",
      "worklog": 12,
      "dateCreated": "2015-12-14T12:12:47.901Z"
    }],
    "page": {
      "current": 1,
      "size": 10,
      "total": 999
    }
  };
  callback(data);
*/

 findAll(function(tickets) {
   var data = {
     "contents": tickets,
     "page": {
       "current": 1,
       "size": tickets.length,
       "total": tickets.length
     }
   };
   callback(data);
 });


}

// @see http://mongodb.github.io/node-mongodb-native/2.1/getting-started/quick-tour/#find-all-documents
function findAll(callback) {
  // Connection URL
  var url = 'mongodb://localhost:27017/tricket';
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // Get the documents collection
    var collection = db.collection('tickets');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      db.close();
      callback(docs);
    });

  });

}
