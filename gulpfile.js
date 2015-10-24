var gulp = require('gulp');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var watch = require('gulp-watch');
var mainBowerFiles = require('main-bower-files');
var templateCache = require('gulp-angular-templatecache');

var css = [
    "./app/assets/**/*.css",
];
var js = [
    // vendor (not picked up by mainBowerFiles)
    "./app/bower_components/taffydb/taffy.js",
    
    // our stuff
    './app/src/**/*.js',
    './app/assets/**/*.css',

    './app/templates.js',
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
    //console.log("Remember: devBuild doesn't include added/removed bower components!");
    var jsAndCssGlob = bowerFiles.concat(js);
    var sources = gulp.src(jsAndCssGlob, {read: false});
    return gulp.src('./app/index.html')
        .pipe( inject(sources, {'ignorePath':'app', relative: true}))
        .pipe(gulp.dest('./app'));
}

function prodBuild() {
    var buildDir = "./app/build/";
    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');

    templates();

    var jsAndBowerCssGlob = bowerFiles.concat(js);
    
    gulp.src(jsAndBowerCssGlob)
        .pipe(jsFilter)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(buildDir));

    gulp.src(jsAndBowerCssGlob.concat(css))
        .pipe(cssFilter) 
        .pipe(concat('all.css'))
        .pipe(gulp.dest(buildDir));

    gulp.src('./app/index.html')
        .pipe( inject( gulp.src([
            buildDir + "**/*.js",
            buildDir + "**/*.css",
        ]), {'ignorePath':'build', relative: true}))
        .pipe(gulp.dest(buildDir));
}

gulp.task('build', function(){
    console.log("Production build");
    return prodBuild();
});

gulp.task('templates', function(){
    templates();
});

function templates () {
    return gulp.src('./app/src/**/*.html')
        .pipe( templateCache( {module: "app", root: "src/"} ))
        .pipe(gulp.dest("./app/"));
}

gulp.task('templates',templates);