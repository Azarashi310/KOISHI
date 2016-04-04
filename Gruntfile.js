module.exports = function (grunt) {
    grunt.initConfig({

        dir: {
            dev: 'dev',
            dist: 'dist'
        },
        copy: {
            dist: {
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.*',
                    '!**/**/*.{scss,css.map,jade}'
                ],
                dest: '<%= dir.dist %>'
            }
        },
        imagemin: {
            dist: {
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.{png,jpg,gif}',
                    '!**/**/*_src/*.{png,jpg,gif}'
                ],
                dest: '<%= dir.dist %>'
            }
        },
        autoprefixer: {
            options: {
                // 一応 last 100 versionで設定。ほんとは last 2 version位でいいんだけど、、
                browsers: ['last 100 version', 'ie 8', 'ie 9']
            },
            dist: {
                src: '<%= dir.dev %>/**/*.css'
            }
        },
        sass: {
            dist: {
                options: {
                    noCache: true
                },
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.scss',
                    '!**/_module.scss'
                ],
                dest: '<%= dir.dev %>',
                ext: '.css'
            }
        },
        jade: {
            dist: {
                options: {
                    pretty: true
                },
                expand: true,
                cwd: '<%= dir.dev %>',
                src: [
                    '**/*.jade',
                    // jadeディレクトリ内のjadeファイルはコンパイル無視
                    '!**/_jade/*.jade'
                ],
                dest: '<%= dir.dev %>',
                ext: '.html'
            }
        },
        watch: {
            css: {
                files: ['<%= dir.dev %>/**/*.scss'],
                tasks: ['newer:sass', 'newer:autoprefixer']
            },
            jade: {
                files: ['<%= dir.dev %>/**/*.jade'],
                tasks: ['jade']
            },
            copy:{
                files: ['<%= dir.dev %>/**/*.*'],
                tasks: ['newer:copy']
            },
            options: {
                livereload: true
            }
        }

    });
    var pkg = grunt.file.readJSON('package.json');
    Object.keys(pkg.devDependencies).forEach(function (devDependency) {
        if (devDependency.match(/^grunt\-/)) {
            grunt.loadNpmTasks(devDependency);
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'jade','autoprefixer','copy']);
};
