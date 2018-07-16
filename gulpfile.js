var gulp = require('gulp');


/*Styles / CSS*/
var concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'), //minifier
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');


/*JavaScript*/
var concat = require('gulp-concat'),
    pump = require('pump'),
    uglify = require('gulp-uglify'),
    babel = require("gulp-babel");

/*Live Reload*/
var server = require('gulp-server-livereload');

 /*Styles / CSS*/
gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe(concatCss("final.scss"))
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("finalStyle.min.css"))
    .pipe(gulp.dest('prod/'))


});

/*JavaScript*/
gulp.task('scripts', function () {
  return gulp.src('src/js/*.js')
	.pipe(concat('finalScript.js'))
	 .pipe(babel({
            presets: ['env']
        }))
	 .pipe(uglify())
   .pipe(rename("finalScript.min.js"))
   .pipe(gulp.dest('prod'));
});

/*Live Reload*/
gulp.task('default', function() {
  gulp.src('prod')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false
    }))
    gulp.watch('src/css/*.scss', ['sass'])
    gulp.watch('src/js/*.js', ['scripts']);
});

