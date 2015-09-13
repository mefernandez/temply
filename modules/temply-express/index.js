'use strict';

var temply = require('temply-core');

module.exports = function (filePath, options, callback) { // define the template engine
	console.log('temply-express');
	temply.render(filePath, options, callback);
}