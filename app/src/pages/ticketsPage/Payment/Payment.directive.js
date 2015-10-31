
function PaymentDirective($log, PaymentProvider) {
    return {
        scope: {
            //companyDetails: "="
        },
        restrict: "E",
        controller: "PaymentController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/ticketsPage/Payment/Payment.partial.html",
        link: function (scope, element, attrs, controller) {
            if (!attrs.name) {
                $log.error("PaymentDirective Must have a attr.name");
            }
            else {
                PaymentProvider.register(attrs.name);
            }
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