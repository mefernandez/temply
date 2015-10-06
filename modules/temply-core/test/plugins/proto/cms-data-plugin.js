/**
 * This plugin is the "role model" for all data plugins
 */
module.exports = function(data, $element, callback) {
  var dataRetrievedByThisPlugin = data || [];
  dataRetrievedByThisPlugin.push('some data');
  callback(dataRetrievedByThisPlugin);
}