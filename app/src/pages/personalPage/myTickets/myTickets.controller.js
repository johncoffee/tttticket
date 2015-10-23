function MyTicketsController($log, MyTickets) {
    var tickets = this.tickets = [];

    MyTickets.getMyTickets().then(function (myTickets) {
        tickets.length = 0;
        myTickets.forEach(function (ticket) {
            tickets.push({
                name: ticket.name,            
            });
        });
    });

    this.showQR = function (ticket) {
        angular.forEach(tickets, function (ticket) {
            ticket.qr = false;
        });
        ticket.qr = true;
    };
}

angular.module("app").controller("MyTicketsController", MyTicketsController);
