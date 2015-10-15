'use strict';

var fs = require('fs');
var templyFactory = require('temply-core');
var log = require('debug')('temply-express');

module.exports = function(pluginsRepository) {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  var temply = templyFactory(pluginsRepository);

  function __express(filePath, options, callback) { // define the template engine
    log('Loading template from file path: ' + filePath);
    var html = fs.readFileSync(filePath, readFileOptions);
    var model = temply.build(html);
    
    //
    temply.render(model, function(html) {
      
      callback(null, html);
    });
  }

  // see http://expressjs.com/guide/using-template-engines.html
  return __express;
}