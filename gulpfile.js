// ---------------------------------
// :: Load Gulp & plugins we'll use
// ---------------------------------

const
  gulp            = require('gulp'),
  autoprefixer    = require('gulp-autoprefixer'),
  browserSync     = require('browser-sync'),
  bower           = require('gulp-bower'),
  cleanCSS        = require('gulp-clean-css'),
  del             = require('del'),
  ghPages         = require('gulp-gh-pages'),
  gulpif          = require('gulp-if'),
  imagemin        = require('gulp-imagemin'),
  install         = require('gulp-install'),
  newer           = require('gulp-newer'),
  notify          = require('gulp-notify'),
  nunjucksRender  = require('gulp-nunjucks-render'),
  reload          = browserSync.reload,
  rename          = require('gulp-rename'),
  runSequence     = require('run-sequence'),
  sourcemaps      = require('gulp-sourcemaps'),
  stylus          = require('gulp-stylus');

// ---------------------------------
// :: Variables
// ---------------------------------

// const taskOptions = globalConfig.getConfigKeys();

var wildCard = '**/*';

var basePaths = {
  src:          'app/',
  temp:         '_temp/',
  dist:         '_dist/',
  bower:        'bower_components/',
};

var paths = {
  pages: {
    src:        basePaths.src + 'views/' + wildCard,
    temp:       basePaths.temp,
  },
  styles: {
    src:        basePaths.src + 'assets/styles/' + wildCard,
    temp:       basePaths.temp,
    s:          basePaths.src + 'assets/styles/styles.styl',
  },
  images: {
    src:        basePaths.src + 'assets/images/' + wildCard,
    temp:       basePaths.temp + 'img/',
  },
  bower: {
    src:        basePaths.bower + wildCard,
    temp:       basePaths.temp,
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
gulp.task('clean', del.bind(null, [
  basePaths.temp
], {dot: true}));

// Pages
gulp.task(tasks.pages, () => {
  gulp.src(paths.pages.src) // finds files in views folder
    .pipe(nunjucksRender({
      path: [basePaths.src + 'views/templates']
    })) // renders pages against the template
    .pipe(gulp.dest(paths.pages.temp))
});

// Styles
gulp.task(tasks.styles, () => {
  gulp.src(paths.styles.s)
    .pipe(sourcemaps.init())
    .pipe(stylus({ style: 'expanded' }))
    .pipe(autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.temp)) // exports *.css
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log('Uncompressed   (.css): ' + details.stats.originalSize + ' bytes');
      console.log('Compressed (.min.css): ' + details.stats.minifiedSize + ' bytes');
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.temp)) // exports *.min.css
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Styles update complete' }))
});

// Images
gulp.task(tasks.images, () =>
  gulp.src(paths.images.src)
    .pipe(newer(paths.images.temp))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.temp))
    .pipe(notify({ message: 'Images task complete' }))
);

// Install bower components and npm packages using gulp
gulp.task('install', () =>
  gulp.src(['./bower.json', './package.json'])
    .pipe(install({allowRoot: true}))
    .pipe(notify({ message: 'Update complete' }))
);

// Copy bower_components over
gulp.task(tasks.copy, () => {
  gulp.src(paths.bower.src)
    .pipe(gulp.dest(paths.bower.temp))
});

// Deploy to github pages
// TODO: Create separate dist task from the temp task
gulp.task('deploy', () => {
  gulp.src(basePaths.temp + wildCard)
    .pipe(ghPages())
});

// Watch files for changes & reload
gulp.task('serve', [tasks.styles], () => {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'BSYNC',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', basePaths.temp]
  })

  gulp.watch([paths.images.src],  [tasks.images, reload])
  gulp.watch([paths.styles.src],  [tasks.styles, reload])
  gulp.watch([paths.pages.src],   [tasks.pages,  reload])
});

// Default task
gulp.task('default', callback => {
  runSequence('clean', tasks.styles, [tasks.pages, tasks.images, tasks.copy], callback);
});
