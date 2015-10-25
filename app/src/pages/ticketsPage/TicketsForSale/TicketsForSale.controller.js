function TicketsForSaleController($log, $q, $scope) {
    this.tickets = [];
    
    this.buy = function(ticket) {
        $scope.onTicketClick({ticket: ticket});
    };
}


angular.module("app").controller("TicketsForSaleController", TicketsForSaleController);
