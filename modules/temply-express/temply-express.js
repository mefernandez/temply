'use strict';

var fs = require('fs');

var templyFactory = require('temply-core');

module.exports = function(pluginsRepository) {

  var readFileOptions = {
    encoding: 'utf8',
    flag: 'r'
  }

  var temply = templyFactory(pluginsRepository);

  function __express(filePath, options, callback) { // define the template engine
    
    var html = fs.readFileSync(filePath, readFileOptions);
    var model = temply.build(html);
    
    //
    temply.render(model, function(html) {
      
      callback(html);
    });
  }

  // see http://expressjs.com/guide/using-template-engines.html
  return __express;
}