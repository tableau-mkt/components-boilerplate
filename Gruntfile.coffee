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
        tasks: ['clean:icons', 'webfont:icons', 'copy:styleguide']

      sass:
        files: [
          'components/{,**/}*.{scss,sass}'
          'sass/{,**/}*.{scss,sass}'
        ]
        tasks: ['sass_globbing', 'sass:dev', 'postcss:dist', 'copy:styleguide']

      kss:
        files: [
          'build/css/*.css'
          'components/{,**/}*.{hbs,html,json}'
        ]
        tasks: ['shell:kss']

      partials:
        files: [
          'components/{,**/}*.hbs'
        ]
        tasks: ['clean:partials', 'copy:partials']

      assets:
        files: ['components/{,**/}*.{png,jpg,gif}']
        tasks: ['copy:assets', 'copy:styleguide']

      js:
        files: ['components/{,**/}*.js']
        tasks: ['concat:scripts', 'concat:sgScripts', 'copy:styleguide']

      bower:
        files: ['bower_components/**.*']
        tasks: ['copy:vendor', 'concat:vendor']

    sass_globbing:
      all:
        files:
          'sass/imports/_colorsMap.scss': 'components/_colors/*.scss'
          'sass/imports/_variablesMap.scss': 'components/_helpers/variables/*.scss'
          'sass/imports/_functionsMap.scss': 'components/_helpers/functions/*.scss'
          'sass/imports/_mixinsMap.scss': 'components/_helpers/mixins/*.scss'
          'sass/imports/_helpersMap.scss': 'components/_helpers/*.scss'
          'sass/imports/_componentsMap.scss': [
            'components/**/*.scss',
            '!components/media/icons/_icons.scss',
            '!components/typography/fonts/_font-face.scss'
          ]

    sass:
      options:
        precision: 5 # decimal places of precision when rounding
      dist:
        options:
          sourceMap: false
        files: [
          {
            expand: true
            extDot: 'last'
            cwd: 'sass'
            src: [
              '*.scss'
              '*.sass'
              '!styleguide.scss'
            ]
            dest: 'build/css'
            ext: '.css'
          }
        ]
      styleguide:
        options:
          sourceMap: false
        files: [
          {
            expand: true
            cwd: 'sass'
            src: [
              'styleguide.scss'
            ]
            dest: 'styleguide/build/css'
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
          require('autoprefixer')({
            browsers: ['ie >= 8', 'last 2 iOS versions', 'last 2 Opera versions', 'last 2 Firefox versions']
          })
        ]
      dist:
        src: ['build/css/*.css', 'styleguide/build/css/*.css']

    cssmin:
      dist:
        files: [
          expand: true,
          extDot: 'last'
          cwd: 'build/css'
          src: ['*.css', '!*.min.css']
          dest: 'build/css'
          ext: '.min.css'
        ]

    shell:
      kss:
        command: './node_modules/.bin/kss-node --config template/config.json'

    concat:
      options:
        separator: ';\n'
      scripts:
        src: [
          'components/{,**/}*.js'
          '!components/{,**/}*.styleguide.js'
        ]
        dest: 'build/js/scripts.js'
      sgScripts:
        src: [
          'components/{,**/}*.styleguide.js'
        ]
        dest: 'styleguide/build/js/styleguide.js'
      vendor:
        src: [
          'bower_components/matchMedia/matchMedia.js'
          'bower_components/hoverintent/jquery.hoverIntent.js'
          'bower_components/waypoints/lib/jquery.waypoints.min.js'
          'bower_components/waypoints/lib/shortcuts/sticky.min.js'
          'bower_components/waypoints/lib/shortcuts/inview.min.js'
          'bower_components/underscore/underscore-min.js'
          'bower_components/Boxer/jquery.ba-dotimeout.min.js'
        ]
        dest: 'build/js/vendor.js'

    copy:
      vendor:
        expand: true
        cwd: 'bower_components'
        src: [
          'jquery/dist/jquery.min.js'
          'jquery-ui/jquery-ui.min.js'
        ]
        dest: 'build/vendor'
      partials:
        cwd: 'components'
        expand: true
        flatten: true
        src: '**/*.hbs'
        dest: 'build/_partials'
      assets:
        expand: true
        cwd: 'components'
        src: '**/*.{jpg,gif,png}'
        dest: 'build/images'
      styleguide:
        expand: true
        src: 'build/**'
        dest: 'styleguide/'
      favicon:
        src: 'favicon.ico'
        dest: 'build/images/'


    webfont:
      icons:
        src: 'components/media/icons/svg/{,**/}*.svg'
        dest: 'build/fonts'
        destCss: 'components/media/icons'
        options:
          font: 'icons'
          htmlDemo: false
          stylesheet: 'scss'
          template: 'components/media/icons/icons.template.css'
          relativeFontPath: '../fonts'
          fontFilename: 'icons-{hash}'

    clean:
      built:
        src: [
          "build/**/*"
          "styleguide/**/*"
        ]
      partials:
        src: ["build/_partials/*.hbs"]

    ###
    Start a connect web server.
    ###
    connect:
      options:
        base: 'styleguide'
        hostname: 'localhost'
        livereload: false
        open: true
        useAvailablePort: true

      styleguide:
        options:
          keepalive: true

    compress:
      build:
        options:
          archive: 'styleguide/styleguide.zip'
        expand: true
        src: 'build/**/*'

  # Load all grunt tasks as defined in package.json devDependencies
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', [
    'watch'
  ]
  grunt.registerTask 'build', [
    'clean:built'
    'clean:partials'
    'webfont:icons'
    'sass_globbing'
    'sass:dist'
    'sass:styleguide'
    'postcss:dist'
    'cssmin:dist'
    'shell:kss'
    'concat:scripts'
    'concat:vendor'
    'concat:sgScripts'
    'copy:partials'
    'copy:vendor'
    'copy:assets'
    'copy:styleguide'
    'copy:favicon'
    'compress:build'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]
  grunt.registerTask 'style', [
    'sass_globbing'
    'sass:dev'
  ]
  return
