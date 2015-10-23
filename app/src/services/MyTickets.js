function MyTickets($q, Auth) {
    
    this.getMyTickets = function () {
        var tickets = [];
        if (Auth.test) {
            tickets.push( new Ticket(1, {
                name: "Nordic Game Jam",
            }));

            tickets.push( new Ticket(2, {
                name: "Beer ticket",
            }));
        }
        return $q.when(tickets);
    };
}

function Ticket(id, data) {
    this.id = id;
    if (data) {
        this.hydrate(data);
    }
}

Ticket.prototype.hydrate = function (data) {
    for (var i in data) if (data.hasOwnProperty(i)) {
        this[i] = data[i];    
    }    
};


angular.module("app").service("MyTickets", MyTickets);