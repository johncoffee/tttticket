function MyTickets($q, Auth, $http) {
    
    this.getMyTickets = function () {
        var deferred = $q.defer();

        var tickets = [];
        
        $http({
            method: "POST",
            data: {
                address: "n4SKTwh8xxNMSH7uN2xRZym7iXCZNwy8vj",
            },
            url: "/api/addressinfo.php",
            cache: true,
        })
        .then(function (response) {
            console.debug(response.data.assets);
            angular.forEach(response.data.assets, function (asset) {
                for (var i = 0; i < asset.amount; i++) {
                    tickets.push(new Ticket(Math.random(), {
                        name: asset.assetId,
                    }));
                } 
                console.debug(tickets);
                deferred.resolve(tickets);
            });
        }, deferred.reject);
        
        //debug 
        if (Auth.test) {
            tickets.push( new Ticket(1, {
                name: "Nordic Game Jam",
            }));

            tickets.push( new Ticket(2, {
                name: "Beer ticket",
            }));
        }
        
        return deferred.promise;
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