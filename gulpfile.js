var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var angularTemplates = require('gulp-angular-templates');
var watch = require('gulp-watch');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');

var js = [
    // our stuff
    './app/src/**/*.js',
    './app/assets/**/*.css',
];

var bowerFiles = mainBowerFiles({
    paths: {
        bowerDirectory: './app/bower_components',
        bowerrc: './bowerrc',
        bowerJson: './bower.json'
    }
});

var handle = null;
gulp.task('watch', function () {
    return gulp.src(js, {read: false})
        .pipe(watch(js, {
            events: ['unlink', 'add'],
            //ignoreInitial: true,
        }, function(){
            clearTimeout(handle);
            handle = setTimeout(devBuild, 33);
        }));
});

function devBuild() {
    var sources = gulp.src(bowerFiles.concat(js), {read: false});
    setTimeout(templates, 1);
    return gulp.src('./app/index.html')
        .pipe( inject(sources, {'ignorePath':'app', relative: true}))
        .pipe(gulp.dest('./app'));
}

gulp.task('default', devBuild);

function templates () {
    return gulp.src('./app/src/**/*.html')
        .pipe(templateCache( {module: "app", base: ""} ))
        .pipe(gulp.dest('./app'));
}
gulp.task('templates',templates);