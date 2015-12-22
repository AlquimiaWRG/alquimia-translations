"use strict";

module.exports = function(defaults) {
  defaults.getElement('angular').push('angular-gettext', 'angular-cookies');
  defaults.getElement('modules').push('gettext');

  return defaults;
};
