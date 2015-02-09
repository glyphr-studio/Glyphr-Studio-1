module.exports = function(grunt) {

	var versionnum = 'v1.00.00.working';

	// Grab HTML parts
	var apphtml = grunt.file.read('dev/Glyphr_Studio.html');
	apphtml = apphtml.split('<!--template_split-->');
	apphtml[0] += '\n<script>\n';
	apphtml[2] = '\n</style>\n' + apphtml[2];

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			merge: {
				src: ['dev/js/*.js'],
				dest: 'build/Glyphr_Studio.min.js'
			},
			dist: {
				options: {
					banner: apphtml[0],
					footer: apphtml[2],
					separator: '\n</script>\n\n<style>\n'
				},
				files: {
					src: ['build/Glyphr_Studio.min.js', 'build/Glyphr_Studio.min.css'],
					dest: ('Glyphr_Studio_-_'+versionnum+'.html')
				}
			},
			build: {
				options: {
					banner: apphtml[0],
					footer: apphtml[2],
					separator: '\n<link rel="stylesheet" type="text/css" href="Glyphr_Studio.min.css" />\n<script src="Glyphr_Studio.min.js"></script>\n'
				},
				files: {
					src: ['build/Glyphr_Studio.min.js', 'build/Glyphr_Studio.min.css'],
					dest: ('Glyphr_Studio_-_'+versionnum+'.build.html')
				}
			}
		},
		uglify: {
			minimize: {
				options: {
					preserveComments: false,
					mangle: true
				},
				files: {
					src: 'build/Glyphr_Studio.min.js',
					dest: 'build/Glyphr_Studio.min.js'
				}
			}
		},
		cssmin: {
			minimize:{
				src: 'dev/Glyphr_Studio.css',
				dest: 'build/Glyphr_Studio.min.css'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['concat:merge', 'uglify', 'cssmin', 'concat:build', 'concat:dist']);
};