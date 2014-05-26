module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'concat',

		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
