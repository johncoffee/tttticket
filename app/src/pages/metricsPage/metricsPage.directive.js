
function MetricsPageDirective($log) {
    return {
        scope: {
        },
        restrict: "E",
        controller: "MetricsPageController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/metricsPage/metricsPage.partial.html",
        link: function (scope, element, attrs, controller) {
            if (!scope.companyDetails) {
            }
        //    attrs.$observe("companyId", function (newVal) {
        //        controller.setCompanyByID(newVal);
        //    });
        //    scope.$watch("companyName", function (newVal) {
        //        if (angular.isObject(newVal)) {
        //            controller.setCompany(newVal);
        //        }
        //    });
        //    controller.setEnabled(scope.$eval(attrs.isEnabled));
        },
    };
}


angular.module("app").directive("ngjMetricsPage", MetricsPageDirective);
