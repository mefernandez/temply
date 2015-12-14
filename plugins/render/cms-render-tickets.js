'use strict';

module.exports = function(data, $element, callback) {
  if (!data) {
    callback();
    return;
  }

  var article = data.shift();
  $element.find('h4').text(article.title);
  $element.find('a').attr('href', article.link);
  $element.find('p').empty().append(article.description.substring(0, 252) + '...');
  callback(data);
}