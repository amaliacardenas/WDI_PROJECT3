var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');

gulp.task('jshint', function() {
  return gulp.src('./src/js/**/*js')
  .pipe(jshint());
});


gulp.task('sass:expanded', function(){
  return gulp.src('./public/src/scss/app.scss')
  .pipe(sass({ outputStyle: 'expanded'}))
  .pipe(gulp.dest('public/css'));
});

gulp.task('sass:compressed', function(){
  return gulp.src('./public/src/scss/app.scss')
  .pipe(sass({ outputStyle: 'compressed'}))
  .pipe(rename('app.min.css'))
  .pipe(gulp.dest('public/css'));  

});

gulp.task('concat', function(){
  return gulp.src(['./public/src/js/app.js', './public/src/js/**/*.js'])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('public/js'));
});

gulp.task('uglify', function(){
  return gulp.src('./public/js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('public/js'));
});

gulp.task('replace:development', function(){
  return gulp.src('./views/index.ejs')
   .pipe(replace(/app\.min\.js/, 'app.js'))
   .pipe(replace(/app\.min\.css/, 'app.css'))
   .pipe(gulp.dest('./views'));
});

gulp.task('replace:production', function(){
  return gulp.src('./views/index.ejs')
   .pipe(replace(/app\.js/, 'app.min.js'))
   .pipe(replace(/app\.css/, 'app.min.css'))
   .pipe(gulp.dest('./views'));
});

gulp.task('default', function(){
  gulp.watch(['./public/src/**/*', 'views/index.ejs'], ['jshint', 'sass:expanded', 'concat', 'replace:development']);
});

gulp.task('build', ['jshint', 'sass:compressed', 'concat', 'uglify', 'replace:production']);


