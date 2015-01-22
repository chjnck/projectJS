module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/**/*.js', 'test/**/*.spec.js'],
            options: {
                // options here to override JSHint defaults
                jshintrc: true
            }
        },
        less: {
          development: {
              options: {
                  paths: ["assets/"]
              },
              files: {"css/main.css": "less/main.less"}
          },
          production: {
              options: {
                  paths: ["assets/"]
              },
              files: {"css/main.css": "less/main.less"}
          }
        },
        injector: {
            options: {},
                local_dependencies: {
                files: {
                'index.html': ['**/*.js', '**/*.css']
                }
            }
        },
        watch: {
            files: ['**/*'],
            tasks: ['jshint']
        }
  });

  // Load the plugin
     grunt.loadNpmTasks('grunt-contrib-jshint'); // detect errors and potential problems in JavaScript code
     grunt.loadNpmTasks('grunt-injector');       // inject references to files into other files
     grunt.loadNpmTasks('grunt-contrib-less');   // CSS pre-processor
     grunt.loadNpmTasks('grunt-contrib-watch');  // Simple config to run jshint any time a file is added, changed or deleted


     grunt.registerTask('all', ['jshint', 'less', 'injector', 'watch']);
};
