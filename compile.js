"use strict";

module.exports = function(watchers) {
  var grunt = require('grunt');

  grunt.task.init = function() {};

  grunt.loadTasks(process.cwd() + '/node_modules/grunt-angular-gettext/tasks');

  grunt.initConfig({
    nggettext_extract: {
      pot: {
        files: {
          'app/languages/template.pot': ['app/index.html', 'app/views/**/*.html']
        }
      }
    },
    nggettext_compile: {
      all: {
        files: { 'app/js/translations.js': ['app/languages/*.po'] },
        options: { module: alquimia.config.appName.camelCase }
      }
    }
  });

  watchers.push({
    watch: ['app/index.html', 'app/views/**/*.html'],
    compile: function(done) {
      alquimia.preventOutput();
      grunt.tasks(['nggettext_extract'], {}, function() {
        alquimia.restoreOutput();
        done();
      });
    }
  }, {
    watch: ['app/languages/*.po'],
    notify: 'app/js/translations.js',
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
