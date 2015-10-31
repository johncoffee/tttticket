function TicketsForSaleController($log, $q, $scope, $http, Shop) {
    var vm = this;
    vm.tickets = [];
    
    this.buy = function(ticket) {
        $scope.onTicketClick({ticket: ticket});
    };

    this.getTickets = function (festID) {
        vm.tickets = [];
        Shop.getTickets().then(function (tickets) {
            
            angular.forEach(tickets, function (ticketVO) {
                vm.tickets.push({
                    name: ticketVO.title,
                    colour: Math.random() > 0.5 ? "yellow" : "blue",
                    price: ticketVO.price,
                });
            });
        });
    };
}


angular.module("app").controller("TicketsForSaleController", TicketsForSaleController);
