'use strict';

var request = require('superagent');
var parseString = require('xml2js').parseString;
var _ = require('lodash');
var log = require('debug')('temply:cms-data-rss-feed');

/**
 * Get A List Apart's latest articles
 */
module.exports = function(data, $element, callback) {
  var url = '/api/tickets';
  log('Reading tickets from URL: ' + url);
  request
    .get(url)
    .set('User-Agent', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)')
    .set('Accept', 'text/xml; charset=UTF-8')
    .end(function(err, res) {
      if (err) throw new Error(err);
      log('Reading feed from URL: ' + url);
      var xml = res.text;
      parseString(xml, function (err, result) {
        var articles = _.chain(result.rss.channel[0].item)
          .take(5)
          .map(function(item) {
            return {
              title: !!item.title ? item.title[0] : '',
              link: !!item.link ? item.link[0] : '',
              description: !!item.description ? item.description[0] : '', 
              author: !!item.author ? item.author[0] : ''
            };
          })
          .value();
        callback(articles);
      });
    });

}