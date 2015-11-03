'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload: 1234

      webfont:
        files: [
          'assets/svg/*.svg',
          'components/{,**/}*.svg'
        ]
        tasks: ['webfont:icons']

      sass:
        files: [
          'components/{,**/}*.{scss,sass}'
          'sass/{,**/}*.{scss,sass}'
        ]
        tasks: ['sass_globbing','sass:dev', 'postcss:dist']

      kss:
        files: [
          'build/css/*.css'
          'components/{,**/}*.{hbs,html,json}'
        ]
        tasks: ['shell:kss']

      js:
        files: ['components/{,**/}*.js']
        tasks: ['concat:dist']

      bower:
        files: ['bower_components/**.*']
        tasks: ['copy:bower']

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
          outputStyle: 'compressed'
        files: [
          {
            expand: true
            cwd: 'sass'
            src: ['*.scss', '*.sass']
            dest: 'build/css'
            ext: '.css'
          }
        ]
      dev:
        options:
          sourceMap: true
          outputStyle: 'expanded'
        files: [
          {
            expand: true
            cwd: 'sass'
            src: ['*.scss', '*.sass']
            dest: 'build/css'
            ext: '.css'
          }
        ]

    postcss:
      options:
        processors: [
          require('autoprefixer-core')({ browers: ['IE8', 'iOS', 'Opera'] })
        ]
      dist:
        src: 'build/css/*.css'



    shell:
      kss:
        command: 'kss-node --config template/config.json'

    concat:
      options:
        separator: ";\n"
      dist:
        src: 'components/{,**/}*.js'
        dest: 'build/js/scripts.js'

    copy:
      bower:
        expand: true
        cwd: 'bower_components'
        src: [
          'jquery/**/*.*'
          'jquery-ui/**/*.*'
          'hoverintent/**/*.*'
          'slick.js/**/*.*'
          'waypoints/**/*.*'
          'matchMedia/**/*.*'
          'underscore/**/*.*'
        ]
        dest: 'build/bower'
      assets:
        expand: true
        src: 'components/**/*.{jpg,gif,png}'
        dest: 'build/images'

    webfont:
      icons:
        src: [
          'assets/svg/*.svg',
          'components/{,**/}*.svg'
        ]
        dest: 'build/fonts'
        destCss: 'components/media/icons'
        htmlDemo: true
        options:
          font: 'tableau-icons'
          stylesheet: 'scss'
          template: 'components/media/icons/tableau-icons.template.css'
          relativeFontPath: '../fonts'
          fontFilename: 'tableau-icons-{hash}'


  # Load all grunt tasks as defined in package.json devDependencies
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', [
    'watch'
  ]
  grunt.registerTask 'build', [
    'webfont:icons'
    'sass_globbing'
    'sass:dist'
    'shell:kss'
    'postcss:dist'
    'concat:dist'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]

  grunt.registerTask 'style', [
    'sass_globbing'
    'sass:dev'
  ]
  return
