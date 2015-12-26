"use strict";

module.exports = function(done) {
  alquimia.del(alquimia.getPath('appDir') + '/' + alquimia.config.languagesDir || 'languages');
  delete alquimia.config.languagesDir;
  delete alquimia.config.languagesFile;
  done();
};
