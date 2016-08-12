// ---------------------------------
// :: Load Gulp & plugins we'll use
// ---------------------------------

var
  gulp          = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer'),
  browserSync   = require('browser-sync'),
  bower         = require('gulp-bower'),
  cleanCSS      = require('gulp-clean-css'),
  del           = require('del'),
  install       = require("gulp-install"),
  notify        = require('gulp-notify'),
  reload        = browserSync.reload,
  rename        = require('gulp-rename'),
  runSequence   = require('run-sequence'),
  sourcemaps    = require('gulp-sourcemaps'),
  stylus        = require('gulp-stylus');

// ---------------------------------
// :: Variables
// ---------------------------------

var wildCard =  '**/*';

var basePaths = {
  src:          'app/',
  temp:         '_temp/',
  dest:         '_dist/',
  bower:        'bower_components/',
};

var paths = {
  pages: {
    src:        basePaths.src + 'views/' + wildCard,
    dest:       basePaths.dest,
  },
  styles: {
    src:        basePaths.src + 'assets/styles/' + wildCard,
    dest:       basePaths.dest,
    s:          basePaths.src + 'assets/styles/styles.styl',
  },
  bower: {
    src:        basePaths.bower + wildCard,
    dest:       basePaths.dest,
  },
  // extras:       ['assets/favicons/**/*', 'assets/checkout/**/*'],
};

var tasks = {
  pages:        'pages',
  styles:       'styles',
  scripts:      'scripts',
  images:       'images',
  fonts:        'fonts',
  copy:         'copy',
};

var autoprefixerBrowsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];

// ---------------------------------
// :: Tasks
// ---------------------------------

// Clean dist directory
gulp.task('clean', del.bind(null, [basePaths.dest], {dot: true}));

// Pages
gulp.task(tasks.pages, function() {
  return gulp.src(paths.pages.src)
    .pipe(gulp.dest(basePaths.dest)); // exports .html
});

// Styles
gulp.task(tasks.styles, function() {
  return gulp.src(paths.styles.s)
    .pipe(sourcemaps.init())
    .pipe(stylus({ style: 'expanded' }))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(paths.styles.dest)) // exports *.css
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log('Uncompressed (.css):   ' + details.stats.originalSize + ' bytes');
      console.log('Compressed (.min.css): ' + details.stats.minifiedSize + ' bytes');
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest)) // exports *.min.css
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Install bower components and npm packages using gulp
gulp.task('install', function () {
  gulp.src(['./bower.json', './package.json'])
    .pipe(install({allowRoot: true}));
});

// Copy bower_components over
gulp.task(tasks.copy, function () {
  return gulp.src(paths.bower.src)
    .pipe(gulp.dest(paths.bower.dest));
});

// Watch files for changes & reload
gulp.task('serve', [tasks.styles], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', basePaths.dest]
  });

  gulp.watch([paths.styles.src], [tasks.styles, reload]);
  gulp.watch([paths.pages.src], [tasks.pages, reload]);
});

// Default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(tasks.styles, [tasks.pages, tasks.copy], cb);
});
