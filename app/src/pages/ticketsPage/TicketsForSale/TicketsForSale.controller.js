function TicketsForSaleController($log, $q, $scope, $http, Shop) {
    var vm = this;
    vm.tickets = [];
    
    this.buy = function(ticket) {
        $scope.onTicketClick({ticket: ticket});
    };

    this.getTickets = function (type) {
        Shop.getTickets(type).then(function (tickets) {
            for (var i in  tickets) {
                var ticketVO = tickets[i];
                vm.tickets[i] = {
                    shopItemID: ticketVO.id,
                    name: ticketVO.title,
                    price: ticketVO.price_currency + " " + ticketVO.price_amount,
                };
            }
        });
    };
}


angular.module("app").controller("TicketsForSaleController", TicketsForSaleController);
