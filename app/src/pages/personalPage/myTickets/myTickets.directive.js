
function MyTicketsDirective($log) {
    return {
        scope: {
            addresses: "="
        },
        restrict: "E",
        controller: "MyTicketsController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/personalPage/myTickets/myTickets.partial.html",
        link: function (scope, element, attrs, controller) {
            if (!scope.addresses) {
                $log.debug("missing addresses");
            }
            scope.$watchCollection('addresses', function(newValue) {
                if (newValue) {
                    controller.fetchFromAddresses(newValue);
                }
            });
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


angular.module("app").directive("ngjMyTickets", MyTicketsDirective);
