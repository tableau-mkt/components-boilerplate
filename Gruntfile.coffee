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
        tasks: ['concat:scripts']

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
      dist:
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
        separator: ';\n'
      scripts:
        src: 'components/{,**/}*.js'
        dest: 'build/js/scripts.js'
      vendor:
        src: [
          'bower_components/slick.js/slick/slick.min.js'
          'bower_components/hoverintent/jquery.hoverIntent.js'
          'bower_components/waypoints/lib/jquery.waypoints.min.js'
          'bower_components/waypoints/lib/shortcuts/sticky.min.js'
          'bower_components/waypoints/lib/shortcuts/inview.min.js'
          'bower_components/underscore/underscore-min.js'
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
        ]
        dest: 'build/vendor'
      assets:
        expand: true
        cwd: 'components'
        src: '**/*.{jpg,gif,png}'
        dest: 'build/images'
      styleguide:
        expand: true
        src: 'build/**'
        dest: 'styleguide/'
        

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


    'gh-pages':
      options:
        base: 'styleguide'
      src: ['**']
      travisDeploy:
        options:
          user:
            name: 'Travis Deployment',
            email: 'visualanalysis@tableau.com'
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/tableau-mkt/components.git',
          message: 'Auto-deploy via Travis CI',
          silent: true
        src: ['**']

    compress:
      build:
        options:
          archive: 'styleguide/tableau-components.zip'
        expand: true
        cwd: 'build/'
        src: '**/*'
        dest: 'tableau-components/'

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
    'copy:vendor'
    'copy:assets'
    'copy:styleguide'
    'concat:scripts'
    'concat:vendor'
  ]
  grunt.registerTask 'styleguide', [
    'shell:kss'
  ]

  grunt.registerTask 'style', [
    'sass_globbing'
    'sass:dev'
  ]

  grunt.registerTask 'autoDeploy', [
    'build'
    'compress:build'
    'gh-pages:testDeploy'
  ]
  return
