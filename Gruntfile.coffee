'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: 1234

      sass:
        files: [
          'components/{,**/}*.{scss,sass}'
          'helpers/{,**/}*.{scss,sass}'
        ]
        tasks: ['compass:dist']

      kss:
        files: [
          'dist/css/{,**/}*.css'
          'components/{,**/}*.{hbs,html}'
        ]
        tasks: ['shell:kss']

      js:
        files: ['components/{,**/}*.js']
        tasks: ['concat:dist']

    compass:
      dist:
        options:
          cssDir: 'dist/css'
          sassDir: 'sass'
          imagesDir: 'images'
          generatedImagesDir: 'images/generated'
          javascriptsDir: 'dist/js'
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
        src: 'components/{,**/}*.js'
        dest: 'dist/js/scripts.js'

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
