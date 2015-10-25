'use strict';

var log = require('debug')('temply:cms-render-database-content');

module.exports.render = function(data, $element, callback) {
  if (!data || data.length < 1) {
    callback();
    return;
  }

  log('Rendering articles with length: ' + data.length);

  var article = data.shift();

  $element.find('h4').text(article.title);
  $element.find('p').empty().append(article.description.substring(0, 252) + '...');
  callback(data);
}

module.exports.extract = function(data, $element, callback) {
  var article = {};
  article.title = $element.find('h4').text();
  article.description = $element.find('p').text();
  log('article: ' + JSON.stringify(article));
  callback(article);
}
