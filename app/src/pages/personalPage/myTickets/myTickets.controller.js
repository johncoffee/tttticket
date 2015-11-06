function MyTicketsController($log, MyTickets) {
    var tickets = [];
    this.tickets = tickets;
    
    this.fetchFromAddresses = function (addresses) {
        tickets.length = 0;
        
        MyTickets.getTicketsForAddresses(addresses).then(function (myTickets) {
            myTickets.forEach(function (ticket) {
                tickets.push({
                    name: ticket.name,
                });
            });
        });
    };

    this.showQR = function (ticket) {
        angular.forEach(tickets, function (ticket) {
            ticket.qr = false;
        });
        ticket.qr = true;
    };
}

angular.module("app").controller("MyTicketsController", MyTicketsController);
