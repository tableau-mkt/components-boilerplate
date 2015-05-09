"use strict"
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: true

      sass:
        files: ["sass/{,**/}*.{scss,sass}"]
        tasks: ["compass"]

      css:
        files: ["css/{,**/}*.css"]
        tasks: ["shell:kss"]

      js:
        files: [
          "js/{,**/}*.js"
          "!js/{,**/}*.min.js"
        ]

    compass:
      dev:
        options:
          cssDir: "css"
          sassDir: "sass"
          imagesDir: "images"
          generatedImagesDir: "images/generated"
          javascriptsDir: "js"
          require: ['toolkit', 'breakpoint', 'susy', 'sass-globbing']
          outputStyle: 'expanded'
          bundleExec: true
          relativeAssets: true
          force: true
          sourcemap: true
          environment: "development"

    cmq:
      options:
        log: true

      dist:
        files:
          "css": ["css/*.css"]

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
    'cmq:dist'
    'shell:kss'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]
  return
