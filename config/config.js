/**
 * A simple module to load the right config-ENV.js file
 * for the current ENV (dev, pre, pro) based on
 * NODE_ENV environment variable (defaults to dev)
 */
module.exports = function loadConfig() {
  var env = process.env.NODE_ENV || 'dev';
  var configFile = './config-' + env;
  console.log('Loading config file: ' + configFile);
  return require(configFile);
}