'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: 1234

      sass:
        files: ['sass/{,**/}*.{scss,sass}']
        tasks: ['compass:dist', 'shell:kss']

      template:
        files: ['index.html']
        tasks: ['shell:kss']

      js:
        files: [
          'js/{,**/}*.js'
          '!js/{,**/}*.min.js'
        ]

    compass:
      dist:
        options:
          cssDir: 'public'
          sassDir: 'sass'
          require: ['toolkit', 'breakpoint', 'susy', 'sass-globbing']
          force: true
          sourcemap: true

    shell:
      kss:
        command: 'kss-node --config config.json'


  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.registerTask 'build', [
    'compass:dist'
    'shell:kss'
  ]
  return
