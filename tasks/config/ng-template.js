/**
 * ngtemplate tasks
 *
 * Speed up your AngularJS app by automatically minifying, combining, and automatically caching your HTML templates with $templateCache.
 *
 **/


module.exports = function(grunt) {

    var templateFilesToInject = [
        'templates/**/*.html'
    ];

    grunt.config.set('ngtemplates',{
        dev:        {
            cwd:      'assets',
            src:      require('../pipeline').templateFilesToInject,
            dest:     './.tmp/public/js/app-templates.js'

        },
        options: {
            module: 'app.templates',
            standalone: true
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
};