
function SchedulePageDirective($log) {
    return {
        scope: {
        },
        restrict: "E",
        controller: "SchedulePageController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/schedulePage/schedulePage.partial.html",
        link: function (scope, element, attrs, controller) {
        },
    };
}


angular.module("app").directive("ngjSchedulePage", SchedulePageDirective);
