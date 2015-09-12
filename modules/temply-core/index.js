'use strict';

var fs = require('fs');

exports.render = function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = 'Delivered by Temply';
    return callback(null, rendered);
  })
}  