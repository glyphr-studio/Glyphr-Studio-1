module.exports = function(grunt) {

	// Grab HTML parts
	var apphtml = grunt.file.read('dev/Glyphr_Studio.html');
	apphtml = apphtml.split('<!--template_split-->');

	var ver = grunt.file.read('dev/js/_settings.js');
	ver = ver.split("thisGlyphrStudioVersionNum: '")[1];
	ver = ver.split("',")[0];
	ver = ver || '0.0.0';

	// Project configuration.
	grunt.initConfig({
		pkg: {version: ver},
		concat: {
			merge: {
				src: [
					'dev/js/_settings.js', 
					'dev/js/_functions.js', 
					'dev/js/obj_*.js', 
					'dev/js/framework_*.js', 
					'dev/js/io_*.js',
					'dev/js/page_*.js',
					'dev/js/panel_*.js',
					'dev/js/lib_*.js'
				],
				dest: 'dist/build/Glyphr_Studio.min.js'
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
				dest: 'dist/build/Glyphr_Studio_-_test.html'
			},
			dist: {
				options: {
					banner: apphtml[0] + '<style>\n',
					footer: '</script>' + apphtml[2],
					separator: '\n</style>\n\n<script>\n'
				},
				src: ['dist/build/Glyphr_Studio.min.css', 'dist/build/Glyphr_Studio.min.js'],
				dest: 'dist/Glyphr_Studio_-_<%= pkg.version %>.html'
			},
			core: {
				src: ['dev/js/_functions.js', 'dev/js/io_glyphr_studio_project_import.js', 'dev/js/obj_*.js'],
				dest: 'dist/build/Glyphr_Studio_Core.js'
			},
		},
		uglify: {
			minimize: {
				options: {
					preserveComments: false,
					mangle: true
				},
				src: 'dist/build/Glyphr_Studio.min.js',
				dest: 'dist/build/Glyphr_Studio.min.js'
			},
			core: {
				options: {
					preserveComments: false,
					mangle: true
				},
				src: 'dist/build/Glyphr_Studio_Core.js',
				// dest: 'dist/Glyphr_Studio_-_<%= pkg.version %>.core.min.js'
				dest: '../Glyphr-Studio-Test-Drive/app/Glyphr_Studio_-_<%= pkg.version %>.core.min.js'
			}
		},
		cssmin: {
			minimize:{
				src: ['dev/openSans.css', 'dev/Glyphr_Studio.css'],
				dest: 'dist/build/Glyphr_Studio.min.css'
			}
		},
		clean: {
			build: "dist/build"
		},
		nwjs: {
		  options: {
		      platforms: ['win','osx'],
		      buildDir: './node_modules/nw/nwjs', // Where the build version of my NW.js app is saved
		  },
		  src: ['./dev']
		}
	});

	// Load the plugins
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Tasks
	grunt.registerTask('default', ['concat:merge', 'uglify:minimize', 'cssmin', 'concat:test', 'concat:dist', 'clean']);
	grunt.registerTask('lite', ['concat:merge', 'cssmin', 'concat:test', 'concat:dist', 'clean']);
	grunt.registerTask('core', ['concat:core', 'uglify:core', 'clean']);
};