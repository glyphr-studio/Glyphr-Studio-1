module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				//wrap: 'Glyphr_Studio',
				preserveComments: false
			},
			build: {
				src: 'Glyphr_Studio.js',
				dest: 'Glyphr_Studio.min.js'
			}
		},
		concat: {
			build: {
				src: ['js/*.js'],
				dest: 'Glyphr_Studio.js'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify']);

};