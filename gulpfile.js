var gulp = require('gulp');
var server = require('./server');
var del = require('del');

//Clean
gulp.task('clean:styles', function() {
    del(['dist/styles/**/*']);
});
gulp.task('clean:scripts', function() {
    del(['dist/scripts/**/*']);
});
gulp.task('clean:images', function() {
    del(['dist/images/**/*']);
});
gulp.task('clean', ['clean:styles', 'clean:scripts', 'clean:images']);


//Build
gulp.task('build:styles', ['clean:styles'], function() {
    return gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest('dist/styles/'));
});
gulp.task('build:scripts', ['clean:scripts'], function() {
    return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts/'));
});
gulp.task('build:images', ['clean:images'], function() {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'));
});
gulp.task('build', ['build:styles', 'build:scripts', 'build:images']);


gulp.task('serve', ['build'], function() {
    server.serve(function() {
        //open browser
    });
});

gulp.task('default', ['build']);
