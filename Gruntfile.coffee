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

      js:
        files: ['components/{,**/}*.{png,jpg,gif}']
        tasks: ['copy:assets', 'copy:styleguide']

      assets:
        files: ['components/{,**/}*.js']
        tasks: ['concat:scripts', 'concat:sgScripts', 'copy:styleguide']

      bower:
        files: ['bower_components/**.*']
        tasks: ['copy:vendor', 'concat:vendor']

    sass_globbing:
      all:
        files:
          'sass/imports/_variablesMap.scss': 'components/_helpers/variables/*.scss'
          'sass/imports/_functionsMap.scss': 'components/_helpers/functions/*.scss'
          'sass/imports/_mixinsMap.scss': 'components/_helpers/mixins/*.scss'
          'sass/imports/_helpersMap.scss': 'components/_helpers/*.scss'
          'sass/imports/_componentsMap.scss': 'components/**/*.scss'

    sass:
      options:
        precision: 5 # decimal places of precision when rounding
      dist:
        options:
          sourceMap: false
        files: [
          {
            expand: true
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
          require('autoprefixer-core')({
            browsers: ['ie >= 8', 'last 2 iOS versions', 'last 2 Opera versions', 'last 2 Firefox versions']
          })
        ]
      dist:
        src: 'build/css/*.css'

    cssmin:
      dist:
        files: [
          expand: true,
          cwd: 'build/css',
          src: ['*.css', '!*.min.css'],
          dest: 'build/css',
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
          'bower_components/slick.js/slick/slick.min.js'
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
          'slick.js/slick/slick.css'
          'slick.js/slick/slick-theme.css'
          'slick.js/slick/ajax-loader.gif'
          'slick.js/slick/fonts/**'
        ]
        dest: 'build/vendor'
      partials:
        cwd: 'components'
        expand: true
        flatten: true
        src: '**/*.hbs'
        dest: 'template/_partials'
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
        src: [
          'assets/svg/*.svg',
          'components/{,**/}*.svg'
        ]
        dest: 'build/fonts'
        destCss: 'components/media/icons'
        options:
          font: 'tableau-icons'
          htmlDemo: false
          stylesheet: 'scss'
          template: 'components/media/icons/tableau-icons.template.css'
          relativeFontPath: '../fonts'
          fontFilename: 'tableau-icons-{hash}'

    clean:
      icons:
        src: ["build/fonts/tableau-icons-*"]
      partials:
        src: ["template/_partials/*.hbs"]

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

    'gh-pages':
      options:
        base: 'styleguide'
      src: ['**']
      qaDeploy:
        options:
          user:
            name: 'Travis Deployment'
            email: 'visualanalysis@tableau.com'
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/tableau-mkt/components.git'
          message: 'Auto-deploy via Travis CI'
          silent: true
        src: ['**']
      prodDeploy:
        options:
          user:
            name: 'Travis Deployment'
            email: 'visualanalysis@tableau.com'
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/tableau-mkt/styleguide.git'
          message: 'Auto-deploy via Travis CI'
          silent: true
        src: ['**']

    compress:
      build:
        options:
          archive: 'styleguide/tableau-components.zip'
        expand: true
        src: 'build/**/*'

  # Load all grunt tasks as defined in package.json devDependencies
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', [
    'watch'
  ]
  grunt.registerTask 'build', [
    'clean:icons'
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
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]

  grunt.registerTask 'style', [
    'sass_globbing'
    'sass:dev'
  ]

  grunt.registerTask 'deployQA', [
    'build'
    'compress:build'
    'gh-pages:qaDeploy'
  ]

  grunt.registerTask 'deployProd', [
    'build'
    'compress:build'
    'gh-pages:prodDeploy'
  ]
  return
