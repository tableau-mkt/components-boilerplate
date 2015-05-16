'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: true

      sass:
        files: ['sass/{,**/}*.{scss,sass}']
        tasks: ['compass:dist']

      kss:
        files: [
          'css/{,**/}*.css'
          'sass/{,**/}*.{hbs,html}'
        ]
        tasks: ['shell:kss']

      js:
        files: ['sass/{,**/}*.js']
        tasks: ['concat:dist']

    compass:
      dist:
        options:
          cssDir: 'css'
          sassDir: 'sass'
          imagesDir: 'images'
          generatedImagesDir: 'images/generated'
          javascriptsDir: 'js'
          require: ['toolkit', 'breakpoint', 'susy', 'sass-globbing']
          outputStyle: 'expanded'
          bundleExec: true
          relativeAssets: true
          force: true
          sourcemap: true

    shell:
      kss:
        command: 'kss-node --config template/config.json'

    concat:
      options:
        separator: ";\n"
      dist: 
        src: 'sass/{,**/}*.js'
        dest: 'js/scripts.js'

  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.registerTask 'build', [
    'compass:dist'
    'shell:kss'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]
  return
