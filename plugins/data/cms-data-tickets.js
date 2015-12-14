'use strict';

var request = require('superagent');
var parseString = require('xml2js').parseString;
var _ = require('lodash');
var log = require('debug')('temply:cms-data-tickets');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tricket');


/**
 * List tickets using MongoDb
 * @see http://mongoosejs.com/docs/index.html
 */
module.exports = function(data, $element, callback) {
  var data = {
    "contents": [
      {
        "_id": "asdf234798",
        "customer": "Customer",
        "ticket_id": "CUS-1",
        "status": "Open",
        "title": "New Ticket",
        "worklog": 12,
        "dateCreated": "2015-12-14T12:12:47.901Z"
      }
    ],
    "page": {
      "current": 1,
      "size": 10,
      "total": 999
    }
};

callback(data);

}
