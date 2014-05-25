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
        app:        {
            src:      '**.html',
            dest:     'template.js',
            options:  {
                usemin: 'dist/vendors.js' // <~~ This came from the <!-- build:js --> block
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
};
