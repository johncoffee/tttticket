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
}

angular.module("app").controller("MyTicketsController", MyTicketsController);
