var log = require('debug')('cms-data-load-save');

module.exports.load = function(data, $element, callback) {
  var data = data || [];
  var content = 'Lorem ipsum dolor sit amet';
  data.push(content);
  callback(data);
}

module.exports.save = function(data, $element, callback) {
  var content = data.shift();
  // Save the content somehwere and pass along what's remaining
  $element.text('Saved: ' + content);
  callback(data);
}