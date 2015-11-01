
function TicketsPageDirective($log) {
    return {
        scope: {
            //companyDetails: "="
        },
        restrict: "E",
        controller: "TicketsPageController",
        controllerAs: "vm",
        templateUrl: "src/pages/ticketsPage/ticketsPage.partial.html",
        link: function (scope, element, attrs, controller) {
            //if (!scope.companyDetails) {
            //    $log.debug("missing companyDetails - did you forget?");
            //}
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


angular.module("app").directive("ngjTicketsPage", TicketsPageDirective);
