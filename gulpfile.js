var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jsmin = require('gulp-jsmin');
var mincss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('css', function() {
	gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(mincss())
		.pipe(autoprefixer('last 5 version'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
	gulp.src('./src/js/weatherAutocomplete.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['js', 'css']);


gulp.task('build', ['default']);
