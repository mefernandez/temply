'use strict';

var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var loaderFactory = require('./plugin-loader');

module.exports = function (pluginsRepository) {


  var pluginsRepository = pluginsRepository ? (pluginsRepository instanceof Array ? pluginsRepository : [pluginsRepository]) : [];

  function findDataPluginName($element) {
    var classAttrValues = $element.attr('class');
    var matches = classAttrValues.match(/cms-(?:data|render)-(?:\w-?)+/);
    if (matches && matches.length) {
      return matches[matches.length-1];
    }
  }
  
  function transformElementToModel(element) {
    var modelItem = {};
    var $element = this.$(element);
    modelItem.name = findDataPluginName($element);
    modelItem.element = $element;
    modelItem.plugin = loaderFactory(pluginsRepository).loadPlugin(modelItem.name);
    return modelItem;
  }

  function findRenderPluginChildren(modelItem) {
    var $dataPluginElement = modelItem.element;
    var renderPluginElements = $dataPluginElement.find('[class*="cms-render"]');
    var children = _.chain(renderPluginElements)
      .map(transformElementToModel, {$: this.$})
      .value();
    modelItem.children = children;
    return modelItem;
  }

  // Build an execution model for the HTML passed as an argument
  function build(html) {
    var $ = cheerio.load(html);
    var elements = $('[class*="cms-"]');
    var loader = loaderFactory(pluginsRepository);

    var model = _.chain(elements)
      .map(function(el) {
        var $el = $(el);
        var clazz = $el.attr('class');
        var plugins = clazz.split(' ');

        var modelItems = _.chain(plugins)
          .filter(function(plugin) {
            var matches = plugin.match(/cms-(?:data|render)-(?:\w-?)+/);
            return !!matches;
          })
          .map(function(plugin) {
            var modelItem = {
              plugin: {
                name: plugin,
                instance: loader.loadPlugin(plugin)
              },
              $element: null,//$el
            };
            return modelItem;
          })
          .value();
        return modelItems;
      })
      .flatten()
      .value();    
    return model;
  }

  // Build an execution model for the HTML passed as an argument
  function render(model) {
    var $ = cheerio.load(model.html);
    var dataPluginElements = model.plugins;
    return model;
  }

  return {
    build: build
  }
}