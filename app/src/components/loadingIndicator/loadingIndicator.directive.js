
function LoadingIndicatorDirective($log) {
    return {
        //scope: {
        //    //isLoading: "="
        //},
        restrict: "E",
        templateUrl: "src/components/loadingIndicator/loadingIndicator.partial.html",
        link: function (scope, element, attrs, controller) {
            scope.isLoading = false;
            scope.$on("loading", function (type, payload) {
                console.log("loading",payload, type);
                scope.isLoading = payload;
            });
        },
    };
}


angular.module("app").directive("ngjLoadingIndicator", LoadingIndicatorDirective);
