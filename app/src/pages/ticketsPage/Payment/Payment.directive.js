
function PaymentDirective($log) {
    return {
        scope: {
            ticket: "=",
        },
        restrict: "E",
        controller: "PaymentController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/ticketsPage/Payment/Payment.partial.html",
        link: function (scope, element, attrs, controller) {
            scope.$watch('ticket', function (newValue) {
                if (newValue) {
                    controller.setTicket(newValue);
                }
            });
            
            //    if (!scope.companyDetails) {
        //        $log.debug("missing companyDetails - did you forget?");
        //    }
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


angular.module("app").directive("ngjPayment", PaymentDirective);
