/**
 * ngtemplate tasks
 *
 * Speed up your AngularJS app by automatically minifying, combining, and automatically caching your HTML templates with $templateCache.
 *
 **/


module.exports = function(grunt) {

    var appconfig = require('../../config/app.js');

    console.log(appconfig)
    grunt.config.set('ngconstant',{
        options: {
            name: 'app.config',
            dest: './.tmp/public/js/app.config.js',
            deps: appconfig.app.dependencies,
            constants: {
              //  app : appconfig.app
            },
            values: {
                debug: true
            }
        },
        build: {
        }
    });

    grunt.loadNpmTasks('grunt-ng-constant');
};