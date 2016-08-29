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
  stylus          = require('gulp-stylus'),
  util           = require('gulp-util');

// ---------------------------------
// :: Variables
// ---------------------------------

// import globalConfig from 'config';
// const taskOptions = globalConfig.getConfigKeys();

var config = {
  production:   !!util.env.production // sets a util.env.production to be false normally so that by default it will do X instead of what it does for --production
};

var wildCard = '**/*';

var basePaths = {
  src:          'app/',
  temp:         '_temp/',
  dist:         'docs/',
  bower:        'bower_components/',
};

var paths = {
  pages: {
    src:        basePaths.src + 'views/' + '*',
    temp:       basePaths.temp,
    dist:       basePaths.dist,
  },
  styles: {
    src:        basePaths.src + 'assets/styles/' + wildCard,
    temp:       basePaths.temp,
    dist:       basePaths.dist,
    s:          basePaths.src + 'assets/styles/styles.styl',
  },
  images: {
    src:        basePaths.src + 'assets/images/' + wildCard,
    temp:       basePaths.temp + 'img/',
    dist:       basePaths.dist,
  },
  bower: {
    src:        basePaths.bower + wildCard,
    temp:       basePaths.temp,
    dist:       basePaths.dist,
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
    }))
    .pipe(config.production ? gulp.dest(paths.pages.dist) : gulp.dest(paths.pages.temp)) // exports file to appropriate folder
});

// Styles
gulp.task(tasks.styles, () => {
  gulp.src(paths.styles.s)
    .pipe(config.production ? util.noop() : sourcemaps.init()) // if --production don't use sourcemaps
    .pipe(stylus({ style: 'expanded' }))
    .pipe(autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(config.production ? util.noop() : sourcemaps.write()) // if --production don't use sourcemaps
    .pipe(config.production ? cleanCSS() : util.noop()) // if --production minimize
    .pipe(config.production ? rename({suffix: '.min'}) : util.noop()) // if --production rename
    .pipe(config.production ? gulp.dest(paths.styles.dist) : gulp.dest(paths.styles.temp)) // exports file to appropriate folder
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Styles update complete' }))
});

// Images
gulp.task(tasks.images, () =>
  gulp.src(paths.images.src)
    .pipe(newer(paths.images.temp))
    .pipe(config.production ? imagemin() : util.noop()) // if --production minify image
    .pipe(config.production ? gulp.dest(paths.images.dist) : gulp.dest(paths.images.temp)) // exports file to appropriate folder
    .pipe(notify({ message: 'Images task complete' }))
);

// Install bower components and npm packages using gulp
gulp.task('install', () =>
  gulp.src(['./bower.json', './package.json'])
    .pipe(install({allowRoot: true}))
    .pipe(notify({ message: 'Update complete' }))
);

// Copy bower_components to folder
gulp.task(tasks.copy, () => {
  gulp.src(paths.bower.src)
    .pipe(config.production ? gulp.dest(paths.bower.dist) : gulp.dest(paths.bower.temp)) // exports file to appropriate folder
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
