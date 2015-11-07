function TicketsPageController() {
    var vm = this;
    vm.showTickets = true;
    vm.buyTicket = null;
    
    vm.onTicketClick = function (ticket) {
        vm.buyTicket = ticket.shopItemID;
        vm.showTickets = false;
    };  
}

angular.module("app").controller("TicketsPageController", TicketsPageController);
