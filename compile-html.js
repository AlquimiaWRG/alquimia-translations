"use strict";

module.exports = function(html) {
  if (alquimia.env === alquimia.ENV_DEV) {
    html.head.children.push('<script type="text/javascript" src="' + alquimia.getPath('compiledScriptsDir') +
      '/translations.js"></script>');
  }

  return html;
};
