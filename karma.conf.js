module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            // deps
            "bower_components/angular/angular.js",
            "bower_components/angular-aria/angular-aria.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-google-chart/ng-google-chart.js",
            "bower_components/qrcode/lib/qrcode.js",
            "bower_components/angular-qr-scanner/qr-scanner.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-material/angular-material.js",
            "bower_components/angular-qr/src/angular-qr.js",
            "bower_components/angular-qr-scanner/src/jsqrcode-combined.min.js",

            // test specific stuff
            "bower_components/angular-mocks/angular-mocks.js",
            
            // all that js
            "./src/**/*.js",
            
            // out tests
            "../tests/**/*.js",
        ],

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-firefox-launcher',
            'karma-jasmine',
            //'karma-junit-reporter'
        ],

        //junitReporter : {
        //  outputFile: 'test_out/unit.xml',
        //  suite: 'unit'
        //}
    });
};
