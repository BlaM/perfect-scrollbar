'use strict';

var ps = require('../main');
var psInstances = require('../plugin/instances');

function mountJQuery(jQuery) {
  if (typeof jQuery !== 'function' || typeof jQuery.fn !== 'object' || typeof jQuery.fn.jquery !== 'string') {
    return false;
  }

  jQuery.fn.perfectScrollbar = function (settingOrCommand) {
    return this.each(function () {
      if (typeof settingOrCommand === 'object' ||
          typeof settingOrCommand === 'undefined') {
        // If it's an object or none, initialize.
        var settings = settingOrCommand;

        if (!psInstances.get(this)) {
          ps.initialize(this, settings);
        }
      } else {
        // Unless, it may be a command.
        var command = settingOrCommand;

        if (command === 'update') {
          ps.update(this);
        } else if (command === 'destroy') {
          ps.destroy(this);
        }
      }
    });
  };

  return true;
}

if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define(['jquery'], mountJQuery);
} else {
  mountJQuery(window.jQuery || window.$);
}

module.exports = mountJQuery;
