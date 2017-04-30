'use strict';
var LIVERELOAD_PORT = 35729;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        paths: {
            src: {
                js: 'app/**/*.js'
            },
            dest: {
                js: 'app/dist/js/main.js',
                jsMin: 'app/min-safe/main.min.js'
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            css: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/static/css/**/*.css'
                ],
                tasks: ['cssmin']
            },
            services: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/services/*.js'
                ],
                tasks: ['uglify:services']
            },
            controllers: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/view/**/*_controller.js'
                ],
                tasks: ['uglify:controllers']
            },
            directives: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/directives/*.js'
                ],
                tasks: ['uglify:directives']
            }
        },
        nodemon: {
            dev: {
                script: 'node-server.js',
                options: {
                    nodeArgs: ['--nolazy',  '--harmony'],
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname,
                    ignore: ['node_modules/**'],
                    watch: ['server']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    //'app/min-safe/controllers/view_controller.js': [ 'app/views/**/*_controller.js'],
                    //
                    'app/min-safe/controllers/angular_controller.js': ['app/views/angularJS/*_controller.js'],
                    'app/min-safe/controllers/games_controller.js': ['app/views/games/**/*_controller.js'],
                    'app/min-safe/controllers/home_controller.js': ['app/views/home/*_controller.js'],
                    'app/min-safe/controllers/node_controller.js': ['app/views/nodeJS/*_controller.js'],
                    'app/min-safe/controllers/project_controller.js': ['app/views/project/*_controller.js'],
                    'app/min-safe/controllers/phyton_controller.js': ['app/views/python/**/*_controller.js'],
                    'app/min-safe/controllers/feeder_controller.js': ['app/views/feeder/**/*_controller.js'],
                    'app/min-safe/controllers/about_controller.js': ['app/views/about/*_controller.js'],
                    'app/min-safe/directives/ng-no-sticky-footer.js': ['app/directives/ng-no-sticky-footer.js'],
                    'app/min-safe/app.js': ['app/app.js']
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.js %>'
            }
        },
        uglify: {
            js: {
                options: {
                    compress : {
                        warnings: false
                    },
                    mangle: true,
                    sourceMap: true
                },
                files: {
                    //'app/dist/js/dependencies.min.js': [ 'app/bower_components/jquery/dist/jquery.min.js',
                    //    'app/bower_components/angular-animate/angular-animate.min.js',
                    //    'app/bower_components/angular-route/angular-route.min.js',
                    //    'app/bower_components/angular-resource/angular-resource.min.js',
                    //    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    //    'app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                    //    'app/bower_components/ng-scrollbars/dist/scrollbars.min.js' ],
                    'app/dist/js/services.min.js': [ 'app/min-safe/services/*.js' ],
                    'app/dist/js/controllers.min.js': [ 'app/min-safe/controllers/*.js' ],
                    'app/dist/js/directives.min.js': [ 'app/min-safe/directives/*.js' ],
                    'app/dist/app.min.js': [ 'app/min-safe/app.js' ]
                }
            },
            services: {
                options: {
                    sourceMap: true
                },
                files: {
                    'app/dist/js/services.min.js': [ 'app/min-safe/services/*.js' ]
                }
            },
            controllers: {
                options: {
                    sourceMap: true
                },
                files: {
                    'app/dist/js/controllers.min.js': [ 'app/min-safe/controllers/*.js' ]
                }
            },
            directives: {
                options: {
                    sourceMap: true
                },
                files: {
                    'app/dist/js/directives.min.js': [ 'app/min-safe/directives/*.js' ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'app/dist/css/main.min.css': ['app/static/css/*.css']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'ngAnnotate', 'uglify:js', 'cssmin', 'open', 'watch' ],
                options: {
                    logConcurrentOutput: true
                }
            },
            prod: {
                tasks: ['forever:server1:start', 'watch' ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './app/bower_components'
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:3000'
            }
        },
        forever: {
            server1: {
                options: {
                    index: 'node-server.js',
                    logDir: 'logs'
                }
            }
        }
    });

    grunt.registerTask('default', function (target) {
        grunt.task.run([ 'ngAnnotate','uglify:js', 'cssmin' ]);
    })
    .registerTask('run-dev', function (target) {
        grunt.task.run([ 'concurrent:dev' ]);
    })
    .registerTask('run-prod', function (target) {
        grunt.task.run([ 'concurrent:prod' ]);
    })
    .registerTask('stop', function (target) {
        grunt.task.run([ 'forever:server1:stop' ]);
    })
    .registerTask('restart', function (target) {
        grunt.task.run([ 'forever:server1:start' ]);
    });
};