module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				src: ['dev/js/*.js'],
				dest: 'current_build/Glyphr_Studio.min.js'
			}
		},
		uglify: {
			options: {
				preserveComments: false,
				mangle: true
			},
			build: {
				src: 'current_build/Glyphr_Studio.min.js',
				dest: 'current_build/Glyphr_Studio.min.js'
			}
		},
		cssmin: {
			build:{
				src: 'dev/Glyphr_Studio.css',
				dest: 'current_build/Glyphr_Studio.min.css'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};