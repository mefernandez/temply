var expect = require('chai').expect;
var path = require('path');
var loader = require('../plugin-loader');

describe('The plugin loader', function() {

  it('should find a plugin passing one plugin repo', function() {
    var pluginsRepository = path.join(__dirname, 'plugins/data');
    var plugin = loader(pluginsRepository).loadPlugin('cms-data-rss-feed');
    expect(plugin).to.not.be.undefined;
  });

  it('should find a plugin passing an array of two plugin repos', function() {
    var pluginsRepository = [path.join(__dirname, 'plugins/data'), path.join(__dirname, 'plugins/render')];
    var plugin = loader(pluginsRepository).loadPlugin('cms-data-rss-feed');
    expect(plugin).to.not.be.undefined;
  });

  it('should retrieve a plugin from cache the second time around', function() {
    var pluginsRepository = path.join(__dirname, 'plugins/data');
    var plugin = loader(pluginsRepository).loadPlugin('cms-data-rss-feed');
    var cachedPlugin = loader(pluginsRepository).loadPlugin('cms-data-rss-feed');
    expect(cachedPlugin.cached).to.be.true;
  });

  it('should return undefined if plugin does not exist in repository', function() {
    var pluginsRepository = path.join(__dirname, 'plugins/data');
    var plugin = loader(pluginsRepository).loadPlugin('plugin-not-exists');
    expect(plugin).to.be.undefined;
  });

  it('should return undefined if repository path does not exist', function() {
    var pluginsRepository = path.join(__dirname, 'plugins/dir-not-exists');
    var plugin = loader(pluginsRepository).loadPlugin('plugin-not-exists');
    expect(plugin).to.be.undefined;
  });

  it('should find a plugin if one repository path does not exist and the other does', function() {
    var pluginsRepository = [path.join(__dirname, 'plugins/dir-not-exists'), path.join(__dirname, 'plugins/data')];
    var plugin = loader(pluginsRepository).loadPlugin('cms-data-rss-feed');
    expect(plugin).to.not.be.undefined;
  });

});


