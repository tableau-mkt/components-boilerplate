'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: true

      sass:
        files: ['sass/{,**/}*.{scss,sass}']
        tasks: ['compass:kss']
        # tasks: ['compass:dist']

      css:
        files: [
          'css/{,**/}*.css'
          'kss-template/public/css/{,**/}*.css'
        ]
        tasks: ['shell:kss']

      js:
        files: [
          'js/{,**/}*.js'
          '!js/{,**/}*.min.js'
        ]

      template:
        files: [
          'kss-template/index.html'
          'kss-template/public/sass/{,**/}*.{scxss,sass}'
        ]
        tasks: ['compass:kss', 'shell:kss']

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
          
      kss:
        options:
          cssDir: 'kss-template/public/css'
          sassDir: 'kss-template/public/sass'
          require: ['toolkit', 'breakpoint', 'susy', 'sass-globbing']
          force: true
          sourcemap: true

    cmq:
      options:
        log: true

      dist:
        files:
          'css': ['css/*.css']

    shell:
      kss:
        command: 'kss-node sass styleguide --template kss-template --css css/style.css'


  grunt.loadNpmTasks 'grunt-combine-media-queries'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.registerTask 'build', [
    'compass:dist'
    'compass:kss'
    'cmq:dist'
    'shell:kss'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]
  return
