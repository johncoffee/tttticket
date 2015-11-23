function MyTicketsController($log, $q, MyTickets) {
    var tickets = [];
    this.tickets = tickets;
    
    this.fetchFromAddresses = function (addresses) {
        tickets.length = 0;
        
        $q.all([
            MyTickets.fetchAssetInfo(),
            MyTickets.getTicketsForAddresses(addresses),
        ]).then(function (results) {
            var ticketTypes = results[0];
            var myTickets = results[1];
            
            myTickets.forEach(function (ticket) {
                var t = {};
                // do we know this ticket type?
                if (ticketTypes[ticket.assetID]) {
                    t.name = ticketTypes[ticket.assetID].name;
                }
                tickets.push(t);
            });
        },
        function(reasons) {
            console.warn(reasons);
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
