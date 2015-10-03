module.exports = function(data, $element, callback) {
  var data = data || [];
  data.push('Lorem ipsum dolor sit amet');
  callback(data);
}