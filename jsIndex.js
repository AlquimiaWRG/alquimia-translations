"use strict";

module.exports = function(defaultJs) {
  defaultJs.getElement('angular').push('angular-gettext', 'angular-cookies');
  defaultJs.getElement('modules').push('gettext');

  return defaultJs;
};
