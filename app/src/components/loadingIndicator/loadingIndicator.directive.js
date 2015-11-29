
function LoadingIndicatorDirective($log) {
    return {
        //scope: {
        //    //isLoading: "="
        //},
        restrict: "E",
        templateUrl: "src/components/loadingIndicator/loadingIndicator.partial.html",
        link: function (scope, element, attrs, controller) {
            var loadingCount = 0;
            scope.isLoading = false;
            scope.$on("loading", function (type, payload) {
                if (payload) {
                    loadingCount++;
                }
                else if (!payload && loadingCount > 0) {
                    loadingCount--;
                }
                else {
                    $log.warn("Someone forgot to emit loading. Count: " + loadingCount);
                }
                scope.isLoading = (loadingCount > 0);
            });
        },
    };
}


angular.module("app").directive("ngjLoadingIndicator", LoadingIndicatorDirective);
