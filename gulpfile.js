var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var connect = require('gulp-connect');
var packg= require('./package.json');
var rename= require('gulp-rename');
var minify= require('gulp-minify');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');

gulp.task('lint',function(){
	return gulp.src('./app/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
})

gulp.task('clean',function(){
	return gulp.src(packg.name + '/' + packg.version + '/*')
			.pipe(clean());
})

gulp.task('connect',function(){
	connect.server({
		root:'.',
		port:3000,
		livereload:true
	});
});

gulp.task('js',function(){
	return gulp.src('app/**/*.js')
	.pipe(concat(packg.name +'.js'))
	.pipe(uglify())
	.pipe(gulp.dest(packg.name + '/' + packg.version + '/js/'))
	.pipe(minify())
	.pipe(rename(packg.name + '.min.js'))
	.pipe(gulp.dest(packg.name + '/' + packg.version + '/js/'));
});

gulp.watch('app/*.js',['clean','lint','js']);

gulp.task('default',['js','connect']);
