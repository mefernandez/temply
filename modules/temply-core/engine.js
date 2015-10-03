'use strict';

var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');
var loader = require('./plugin-loader');

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
    modelItem.plugin = loader(pluginsRepository).loadPlugin(modelItem.name);
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
    var dataPluginElements = $('[class*="cms-data"]');
    var model = {html: html};
    var plugins = _.chain(dataPluginElements)
      .map(transformElementToModel, {$: $})
      .map(findRenderPluginChildren, {$: $})
      .value();
    model.plugins = plugins;
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