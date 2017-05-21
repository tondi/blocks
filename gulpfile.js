var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'

  })

};

gulp.task('sass', function() {
  gulp.src('./static/scss/style.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./static/'))
    .pipe(livereload());


});

// doesnt work
// gulp.task('php', function () {
//   gulp.src('./*.php')
//     .pipe(livereload());
// });


// gulp.task('js', function () {
//     gulp.src('js/src/*.js')
//     .pipe(concat('theme.js'))
//     .pipe(gulp.dest('js'));
// });

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('static/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);