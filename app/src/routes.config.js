angular.module('app')
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/tickets', {
            templateUrl: "partials/tickets.html",
        })
        .when('/schedule', {
            templateUrl: "partials/schedule.html",
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
        })
        .when('/metrics', {
            templateUrl: 'partials/metrics.html',
        })
        .otherwise({
            templateUrl: 'partials/login.html',
        });
        //.when('/Book/:bookId/ch/:chapterId', {
        //    templateUrl: 'chapter.html',
        //    controller: 'ChapterController'
        //});

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
});