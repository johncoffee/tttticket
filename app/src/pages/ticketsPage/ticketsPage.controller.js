function TicketsPageController($log, 
                               $http,
                               $window,
                               $q, 
                               $timeout,
                               Auth) {
    var vm = this;
    vm.showTickets = true;
    vm.buyTicket = null;
    
    vm.onTicketClick = function (ticket) {
        console.debug(ticket);
        vm.buyTicket = {
            name: ticket.name,
            price: ticket.price_tag,
            amount: ticket.price_dkk,
        };
        vm.showTickets = false;
        console.debug(vm.buyTicket);
    };  
}

angular.module("app").controller("TicketsPageController", TicketsPageController);
