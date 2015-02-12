module.exports = function(grunt) {

	// Grab HTML parts
	var apphtml = grunt.file.read('dev/Glyphr_Studio.html');
	apphtml = apphtml.split('<!--template_split-->');

	var ver = grunt.file.read('dev/js/_settings.js');
	ver = ver.split("'thisGlyphrStudioVersionNum': '")[1];
	ver = ver.split("',")[0];
	ver = ver || '0.0.0';

	// Project configuration.
	grunt.initConfig({
		pkg: {version: ver},
		concat: {
			merge: {
				src: ['dev/js/*.js'],
				dest: 'build/Glyphr_Studio.min.js'
			},
			test: {
				options: {
					stripbanners: true,
					banner: apphtml[0] + 
						'<link rel="stylesheet" type="text/css" href="Glyphr_Studio.min.css" />\n\n' + 
						'<script src="Glyphr_Studio.min.js"></script>' +
						apphtml[2]
				},
				src: 'nothing',
				dest: 'build/Glyphr_Studio_-_test.html'
			},
			dist: {
				options: {
					banner: apphtml[0] + '<style>\n',
					footer: '\n</script>' + apphtml[2],
					separator: '\n</style>\n\n<script>\n'
				},
				src: ['build/Glyphr_Studio.min.css', 'build/Glyphr_Studio.min.js'],
				dest: 'dist/Glyphr_Studio_-_<%= pkg.version %>.html'
			}
		},
		uglify: {
			minimize: {
				options: {
					preserveComments: false,
					mangle: true
				},
				src: 'build/Glyphr_Studio.min.js',
				dest: 'build/Glyphr_Studio.min.js'
			}
		},
		cssmin: {
			minimize:{
				src: 'dev/Glyphr_Studio.css',
				dest: 'build/Glyphr_Studio.min.css'
			}
		}/*,
		copy: {
			test:{
				src: 'dist/Glyphr_Studio_-_<%= pkg.version %>.html',
				dest: 'build/index.html'
			}
		}*/
	});

	// Load the plugins
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['concat:merge', 'uglify', 'cssmin', 'concat:test', 'concat:dist']);
};