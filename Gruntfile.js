module.exports = function (grunt) {

    // Force concat and other plugins to use LF always
    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        buildDir: './build',
        distDir: './dist',
        srcDir: './src',

        clean: {
            build: [
                "<%= buildDir %>/*",
                "<%= distDir %>/*"
            ]
        },

        // Duplicate source for following building tasks
        copy: {
            build: {
                files: [
                    {expand: true, cwd: '<%= srcDir %>/', src: ['**'], dest: '<%= buildDir %>/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: '<%= buildDir %>/', src: ['**'], dest: '<%= distDir %>/'}
                ]
            }
        },

        // String replacements
        replace: {
            build: {
                src: ['<%= buildDir %>/**/*.{js,json}'],
                overwrite: true,
                replacements: [
                    {
                        from: "$PROJECT_NAME$",
                        to: "<%= pkg.name %>"
                    },
                    {
                        from: "$PROJECT_HOMEPAGE$",
                        to: "<%= pkg.homepage %>"
                    },{
                        from: "$PROJECT_VERSION$",
                        to: "<%= pkg.version %>"
                    },{
                        from: "$PROJECT_LICENSE$",
                        to: "<%= pkg.license %>"
                    }
                ]
            }
        },

        // Javascript compresion
        uglify: {
            options: {
                mangle: true,
                compress: true,
                preserveComments: 'some'
            },

            dist: {
                options: {
                    report: 'gzip'
                },
                files: {
                    '<%=distDir%>/dv-srcset.min.js': [
                        '<%= distDir %>/dv-srcset.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'replace:build',
        'copy:dist',
        'uglify:dist'
    ]);
    grunt.registerTask('default', 'build');
};
