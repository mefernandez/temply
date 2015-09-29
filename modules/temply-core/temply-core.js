'use strict';

var fs = require('fs');

module.exports = function(dataPlugins, renderPlugins) {

  return {
    render: function (filePath, options, callback) {
      fs.readFile(filePath, function (err, buffer) {
        if (err) return callback(new Error(err));
        // this is an extremely simple template engine
        var rendered = buffer.toString();
        return callback(null, rendered);
      });
    }
  }

}  