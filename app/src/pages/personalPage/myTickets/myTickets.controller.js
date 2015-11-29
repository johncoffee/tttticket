function MyTicketsController($log, $q, AssetInfo, CurrentUser) {
    var tickets = [];
    this.tickets = tickets;
    
    this.fetchFromAddresses = function (addresses) {
        tickets.length = 0;
        
        $q.all([
            AssetInfo.fetchTicketTypes(),
            AssetInfo.getTicketsForAddresses(addresses),
            AssetInfo.getMyAddresses(CurrentUser.getID()),
        ]).then(function (results) {
            var ticketTypes = results[0];
            var addresses = results[1];
            var myAddresses = results[2];
                
            angular.forEach(addresses, function (address) {
                angular.forEach(address, function (ticket) {    
                    var t = {};
                    // do we know this ticket type?
                    if (ticketTypes[ticket.assetID]) {
                        t.name = ticketTypes[ticket.assetID].name;
                    }
                    if (myAddresses[ticket.address]) {
                        t.privateWip = myAddresses[ticket.address].private_wif; 
                    }
                    tickets.push(t);
                });
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
