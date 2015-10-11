function MyTicketsController($log) {
    var tickets = this.tickets = [];
    
    tickets.push({
        name: "Nordic Game Jam",
    });
    tickets.push({
        name: "Copenhagen games festival",
    });
    tickets.push({
        name: "w00t",
    });
}

angular.module("app").controller("MyTicketsController", MyTicketsController);
