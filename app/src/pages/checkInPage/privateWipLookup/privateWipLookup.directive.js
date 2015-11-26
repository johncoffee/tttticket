
function PrivateWipLookupDirective($log) {
    return {
        scope: {
            //privateWip: "="
        },
        restrict: "E",
        controller: "PrivateWipLookupController",
        controllerAs: "vm",
        templateUrl: "src/pages/checkInPage/privateWipLookup/privateWipLookup.partial.html",
        link: function (scope, element, attrs, controller) {
        //    if (!scope.companyDetails) {
        //        $log.debug("missing companyDetails - did you forget?");
        //    }
            attrs.$observe("privateWip", function (newVal) {
                controller.setPrivateWip(newVal);
            });
        //    scope.$watch("companyName", function (newVal) {
        //        if (angular.isObject(newVal)) {
        //            controller.setCompany(newVal);
        //        }
        //    });
        //    controller.setEnabled(scope.$eval(attrs.isEnabled));
        },
    };
}


angular.module("app").directive("ngjPrivateWipLookup", PrivateWipLookupDirective);
