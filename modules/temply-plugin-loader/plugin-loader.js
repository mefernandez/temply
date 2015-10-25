var path = require('path');
var fs = require('fs');

module.exports = function(pluginsRepository) {

  var pluginsRepository = pluginsRepository ? (pluginsRepository instanceof Array ? pluginsRepository : [pluginsRepository]) : [];

  var pluginsCache = {};

  function loadPlugin(pluginName) {

    var plugin = pluginsCache[pluginName];

    if (plugin)
      return plugin;

    for (var i=0; i<pluginsRepository.length; i++) {
      var basePath = pluginsRepository[i];
      var pathToPlugin = path.join(basePath, pluginName + '.js');
      if (!fs.existsSync(pathToPlugin)) {
        continue;
      } else {
        var plugin = require(pathToPlugin);
        plugin.cached = true;
        pluginsCache[pluginName] = plugin;
        return plugin;
      }
    }
  }

  return {

    loadPlugin: loadPlugin

  }



}