'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: 1234

      sass:
        files: [
          'components/{,**/}*.{scss,sass}'
          'sass/{,**/}*.{scss,sass}'
        ]
        tasks: ['sass_globbing','sass:dev']

      kss:
        files: [
          'dist/css/*.css'
          'components/{,**/}*.{hbs,html,json}'
        ]
        tasks: ['shell:kss']

      js:
        files: ['components/{,**/}*.js']
        tasks: ['concat:dist']

    sass_globbing:
      all:
        files:
          'sass/imports/_variablesMap.scss': 'components/_helpers/variables/*.scss'
          'sass/imports/_functionsMap.scss': 'components/_helpers/functions/*.scss'
          'sass/imports/_mixinsMap.scss': 'components/_helpers/mixins/*.scss'
          'sass/imports/_helpersMap.scss': 'components/_helpers/*.scss'
          'sass/imports/_componentsMap.scss': 'components/**/*.scss'

    sass:
      dist:
        options:
           sourceMap: true
           outputStyle: 'expanded'
        files: [
          {
            expand:true
            cwd: 'sass'
            src: ['*.scss', '*.sass']
            dest: 'dist/css'
            ext: '.css'
          }
        ]
      dev:
        options:
           sourceMap: true
           outputStyle: 'expanded'
        files: [
          {
            expand:true
            cwd: 'sass'
            src: ['*.scss', '*.sass']
            dest: 'dist/css'
            ext: '.css'
          }
        ]

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

  # Load all grunt tasks as defined in package.json devDependencies
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'build', [
    'sass:dist'
    'shell:kss'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]

  grunt.registerTask 'style', [
    'sass_globbing'
    'sass:dev'
  ]
  return
