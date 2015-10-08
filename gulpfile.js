var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var angularTemplates = require('gulp-angular-templates');
var watch = require('gulp-watch');

var js = [
    // vendor
    "./app/bower_components/angular/angular.js",
    "./app/bower_components/angular-animate/angular-animate.js",
    "./app/bower_components/angular-aria/angular-aria.js",
    "./app/bower_components/angular-material/angular-material.js",
    "./app/bower_components/angular-route/angular-route.js",

    // our stuff
    './app/src/**/*.js',
];

var css = [
    './assets/**/*.css',
];

gulp.task('develop', function () {
    var target = gulp.src('./app/index.html');
    var sources = gulp.src(js, {read: false})
        .pipe(watch(js));
    
    return target.pipe( inject(sources, {'ignorePath':'app'}))
                 .pipe(gulp.dest('./app'));
});

gulp.task('build', function () {
    return gulp.src(js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/'));
});


gulp.task('templates', function () {
    return gulp.src(js)
        //.pipe(concat('app.js'))
        .pipe(gulp.src('./partials/**/*.html'))
        .pipe(angularTemplates({module:"app"}))
        //.pipe(concat('templates.js'))
        .pipe(gulp.dest('./build/'));
});

var ngAnnotate = require('gulp-ng-annotate');

gulp.task('annotate', function () {
    return gulp.src(js)
        .pipe(ngAnnotate())
        .pipe(gulp.dest('build'));
});
