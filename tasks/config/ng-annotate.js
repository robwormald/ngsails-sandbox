/**
 * ngannotate tasks
 *
 *
 *
 **/


module.exports = function(grunt) {

    grunt.config.set('ngAnnotate',{
        options: {
//            name: 'config',
//            dest: './.tmp/public/js/app.config.js',
//            constants: {
//                package: require('../../config/app.js')
//            },
//            values: {
//                debug: true
//            }
        },
        build: {
        }
    });

    grunt.loadNpmTasks('grunt-ng-annotate');
};