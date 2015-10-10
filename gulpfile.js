var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var angularTemplates = require('gulp-angular-templates');
var watch = require('gulp-watch');
var mainBowerFiles = require('main-bower-files');

var js = [
    // vendor
    //"./app/bower_components/angular/angular.js",
    //"./app/bower_components/angular-animate/angular-animate.js",
    //"./app/bower_components/angular-aria/angular-aria.js",
    //"./app/bower_components/angular-material/angular-material.js",
    //"./app/bower_components/angular-route/angular-route.js",

    // our stuff
    './app/src/**/*.js',
    './app/assets/**/*.css',
];

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
    var bowerFiles = mainBowerFiles({
        paths: {
            bowerDirectory: './app/bower_components',
            bowerrc: './bowerrc',
            bowerJson: './bower.json'
        }
    });
    console.log(bowerFiles);
    var sources = gulp.src(bowerFiles.concat(js), {read: false});
    return gulp.src('./app/index.html')
        .pipe( inject(sources, {'ignorePath':'app', relative: true}))
        .pipe(gulp.dest('./app'));
}

gulp.task('inject', devBuild);
