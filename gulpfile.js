var gulp = require('gulp');
var server = require('./server');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var serverPort = 8000;
var browserSyncPort = 8001;

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
    .pipe(gulp.dest('dist/styles/'))
    .pipe(reload({stream:true}));
});
gulp.task('build:scripts', ['clean:scripts'], function() {
    return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(reload({stream:true}));
});
gulp.task('build:images', ['clean:images'], function() {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'))
    .pipe(reload({stream:true}));
});
gulp.task('build', ['build:styles', 'build:scripts', 'build:images']);


//Serve
gulp.task('watch', function() {
    gulp.watch('src/styles/**/*', ['build:styles']);
    gulp.watch('src/scripts/**/*', ['build:scripts']);
    gulp.watch('src/images/**/*', ['build:images']);
});
gulp.task('serve', ['build', 'watch'], function() {
    server.listen(serverPort, function() {
        console.log("Server listening on port " + serverPort);
    });
});
gulp.task('browser-sync', ['serve'], function() {
    browserSync({
        proxy: "http://localhost:" + serverPort,
        port: browserSyncPort
    });
});

gulp.task('default', ['browser-sync']);
