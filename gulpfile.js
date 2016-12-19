var gulp = require('gulp');

// css
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

// js
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish'); // add color to jshint output
var include = require('gulp-include');
// css + js
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');


var paths = {
    sassSrc: 'source/sass/*.scss',
    watchSass:'source/sass/*/*.scss',
    jsSrc: 'source/js/*.js',
    jsComponents: 'source/js/*/*.js',
    jsPlugins: 'source/plugins/*.js',
    dist: 'dist/',
    distCompile: 'compile/',
    sassCompile: 'source/sass/compile/*.scss',
};

// Production style
var inProduction = false;

var onError = function(err) {
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      Error: "<%= error.message %>"
    })(err);
    this.emit('end');
};

gulp.task('sass', function () {
    if (!inProduction) {
        gulp.src(paths.sassSrc)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'IE 7'], 
                    remove: true 
                }))
            .pipe(sourcemaps.write())
            // .pipe(gzip())
            .pipe(gulp.dest(paths.dist));
    } else {
        gulp.src(paths.sassSrc)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['> 1%', 'IE 7'], 
                remove: true 
            }))
        // .pipe(gzip())
        .pipe(gulp.dest(paths.dist));
    }
});

gulp.task('sassCompile', function () {
    if (!inProduction) {
        gulp.src(paths.sassCompile)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(autoprefixer({
                    browsers: ['> 1%', 'IE 7'], 
                    remove: true 
                }))
            .pipe(sourcemaps.write())
            // .pipe(gzip())
            .pipe(gulp.dest(paths.distCompile));
    } else {
        gulp.src(paths.sassCompile)
            .pipe(plumber({errorHandler: onError}))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                browsers: ['> 1%', 'IE 7'], 
                remove: true 
            }))
        // .pipe(gzip())
        .pipe(gulp.dest(paths.distCompile));
    }
});

gulp.task('js',function() {
    if (!inProduction) { // not in production
        return gulp.src([paths.jsPlugins, paths.jsSrc])
            .pipe(plumber({errorHandler: onError}))
            // .pipe(jshint())
            // .pipe(jshint.reporter(stylish))
            .pipe(include())
            .pipe(concat('js.js'))
            // .pipe(gzip())
            .pipe(gulp.dest(paths.dist))
            .pipe(gulp.dest(paths.distCompile));
    } else {
        return gulp.src([paths.jsPlugins, paths.jsSrc])
            .pipe(plumber({errorHandler: onError}))
            .pipe(include())
            .pipe(uglify())
            .pipe(concat('js.js'))
            // .pipe(gzip())
            .pipe(gulp.dest(paths.dist))
    }
});

gulp.task('jsCompile',function() {
    if (!inProduction) { // not in production
        return gulp.src([paths.jsPlugins, paths.jsSrc])
            .pipe(plumber({errorHandler: onError}))
            // .pipe(jshint())
            // .pipe(jshint.reporter(stylish))
            .pipe(include())
            .pipe(concat('wire.js'))
            // .pipe(gzip())
            .pipe(gulp.dest(paths.distCompile));
    } else {
        return gulp.src([paths.jsPlugins, paths.jsSrc])
            .pipe(plumber({errorHandler: onError}))
            .pipe(include())
            .pipe(uglify())
            .pipe(concat('wire.js'))
            // .pipe(gzip())
            .pipe(gulp.dest(paths.distCompile));
    }
});

gulp.task('watch',function() {
    gulp.watch(paths.sassSrc, ['sass']);
    gulp.watch(paths.watchSass, ['sass']);
    gulp.watch(paths.jsComponents, ['js']);
    gulp.watch(paths.jsSrc, ['js']);
});

// run sass + js watch for any more changes
// gulp.task('default', ['sass', 'js', 'watch']);
gulp.task('default', ['sass', 'watch']);

gulp.task('compile', ['sassCompile','jsCompile']);