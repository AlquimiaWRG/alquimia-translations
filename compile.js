"use strict";

module.exports = function(watchers) {
  var grunt = require('grunt');

  var appDir = alquimia.getPath('appDir');
  var viewsDir = alquimia.config.viewsDir || 'views';
  var compiledScriptsDir = alquimia.getPath('compiledScriptsDir');
  var languagesDir = alquimia.config.languagesDir || 'languages';
  var languagesFile = alquimia.config.languagesFile || 'template';

  grunt.task.init = function() {};

  grunt.loadTasks(process.cwd() + '/node_modules/grunt-angular-gettext/tasks');

  var extractFiles = {};
  var compileFiles = {};

  extractFiles[appDir + '/' + languagesDir + '/' + languagesFile + '.pot'] = [
    appDir + '/index.html',
    appDir + '/' + viewsDir + '/**/*.html'
  ];

  compileFiles[appDir + '/' + compiledScriptsDir + '/translations.js'] = [appDir + '/' + languagesDir + '/*.po'];

  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: extractFiles
      }
    },
    nggettext_compile: {
      all: {
        files: compileFiles,
        options: { module: alquimia.config.appName.camelCase }
      }
    }
  });

  watchers.push({
    watch: [appDir + '/index.html', appDir + '/' + viewsDir + '/**/*.html'],
    compile: function(done) {
      alquimia.preventOutput();
      grunt.tasks(['nggettext_extract'], {}, function() {
        alquimia.restoreOutput();
        done();
      });
    }
  }, {
    watch: [appDir + '/' + languagesDir + '/*.po'],
    notify: appDir + '/' + compiledScriptsDir + '/translations.js',
    compile: function(done) {
      alquimia.preventOutput();
      grunt.tasks(['nggettext_compile'], {}, function() {
        alquimia.restoreOutput();
        done();
      });
    }
  });

  return watchers;
};
