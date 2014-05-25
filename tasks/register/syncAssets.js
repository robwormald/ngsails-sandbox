module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'ngtemplates:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
