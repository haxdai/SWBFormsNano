var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
	uglify = require('gulp-uglify');
 
gulp.task('css', function () 
{
  gulp.src(['css/nano.css','css/nanopharmacia.css'])
    .pipe(concatCss("style.css"))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('dist/'))
    .pipe(notify("Ha finalizado la task css!"));
});

gulp.task('cssAdmin', function () 
{
  gulp.src('css/nanoadmin.css')
    .pipe(concatCss("styleAdmin.css"))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('dist/'))
    .pipe(notify("Ha finalizado la task css!"));
});
 
gulp.task('js', function() 
{
  gulp.src('js/**/*.js')
    .pipe(concatJs('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
    .pipe(notify("Ha finalizado la task js!"));
});