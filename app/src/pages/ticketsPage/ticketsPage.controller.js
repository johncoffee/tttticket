function TicketsPageController($log, 
                               $http,
                               $window,
                               $q, 
                               $timeout,
                               Auth) {
    var vm = this;
    
    vm.isLoggedIn = Auth.authenticated;
    
    this.onTicketClick = function (ticket) {
        this.buyTicket = angular.copy(ticket);
    };
    
    this.tickets = [];

    this.getTickets = function () {
        return $q.when([
            {
                name: "Nordic Game Jam 2016 - Regular",
                price: "DKK 800,00",
            },
            {
                name: "Nordic Game Jam 2016 - Student",
                price: "DKK 600,00",
            },
        ]);
    };

    this.getTickets().then(function (tickets) {
        vm.tickets = tickets;
    });
}

angular.module("app").controller("TicketsPageController", TicketsPageController);
