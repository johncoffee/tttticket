angular.module('app')
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/tickets', {
            template: "<ngj-tickets-page></ngj-tickets-page>",
            caseInsensitiveMatch: true,
        })
        .when('/schedule', {
            template: "<ngj-schedule-page></ngj-schedule-page>",
            caseInsensitiveMatch: true,
        })
        .when('/login', {
            template: '<ngj-login-page></ngj-login-page>',
            caseInsensitiveMatch: true,
        })
        .when('/metrics', {
            template: '<ngj-metrics-page></ngj-metrics-page>',
            caseInsensitiveMatch: true,
        })
        .when('/me', {
            template: '<ngj-personal-page></ngj-personal-page>',
            caseInsensitiveMatch: true,
        })
        .when('/checkin', {
            template: '<ngj-check-in-page></ngj-check-in-page>',
            caseInsensitiveMatch: true,
        })
        .otherwise({
            redirectTo: '/login',
        });

    $locationProvider.html5Mode(false);
});