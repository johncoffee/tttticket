var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var angularTemplates = require('gulp-angular-templates');
var watch = require('gulp-watch');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');

var js = [
    // vendor
    "./app/taffydb/taffy.js",
    
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

js = bowerFiles.concat(js);

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
    //console.log("Remember: devBuild doesn't include added/removed bower components!");
    var sources = gulp.src(js, {read: false});
    return gulp.src('./app/index.html')
        .pipe( inject(sources, {'ignorePath':'app', relative: true}))
        .pipe(gulp.dest('./app'));
}

function prodBuild() {
    return gulp.src(js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest("./app/build/"));
}

gulp.task('build', function(){
    console.log("Production build");
    return prodBuild();
});

function templates () {
    return gulp.src('./app/src/**/*.html')
        .pipe(templateCache( {module: "app", base: ""} ))
        .pipe(gulp.dest('./app'));
}

gulp.task('templates',templates);