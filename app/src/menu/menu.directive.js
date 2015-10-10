
function MenuDirective($log) {
    return {
        scope: {
        },
        restrict: "E",
        controller: "MenuController",
        controllerAs: "ctrl",
        templateUrl: "src/menu/menu.partial.html",
        link: function (scope, element, attrs, controller) {
        },
    };
}


angular.module("app").directive("ngjMenu", MenuDirective);
