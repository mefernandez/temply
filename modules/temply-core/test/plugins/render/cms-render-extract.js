module.exports.render = function(data, $element, callback) {
  var content = data.shift();
  $element.text(content);
  callback(data);
}

module.exports.extract = function(data, $element, callback) {
  var text = $element.text();
  data.push(text);
  callback(data);
}