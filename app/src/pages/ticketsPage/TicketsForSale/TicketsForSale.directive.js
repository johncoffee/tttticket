
function TicketsForSaleDirective($log) {
    return {
        scope: {
            tickets: "=",
            onTicketClick: "&",
        },
        restrict: "E",
        controller: "TicketsForSaleController",
        controllerAs: "ctrl",
        templateUrl: "src/pages/ticketsPage/TicketsForSale/TicketsForSale.partial.html",
        link: function (scope, element, attrs, controller) {
            if (scope.tickets) {
                controller.tickets = scope.tickets;
            }
            else if (attrs.festId) {
                controller.getTickets(attrs.festId);
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

angular.module("app").directive("ngjTicketsForSale", TicketsForSaleDirective);
