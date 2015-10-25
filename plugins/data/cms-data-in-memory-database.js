'use strict';

var log = require('debug')('temply:cms-data-rss-feed');

var articles = [
  {
    title: 'Some article',
    description: 'This is just some article from an in-memory database.'
  },
  {
    title: 'Some other article',
    description: 'Lorem ipsum dolor sit amet database.'
  }
];

/**
 * Return all articles from the "database"
 */
module.exports.load = function(data, $element, callback) {
  log('Loading articles with length: ' + articles.length);
  var copy = articles.slice(0, articles.length);
  callback(copy);
}

/**
 * Save an article to the database
 */
module.exports.save = function(data, $element, callback) {
  articles.push(data);
  callback(articles);
}
