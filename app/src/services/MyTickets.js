function MyTickets($q, Auth, $http) {
    var that = this;
    this.getMyAddresses = function () {
        var deferred = $q.defer();
        $http({
            url: "/api/my_addresses.php",
            method: "GET",
            cache: true,
            responseType: "json",
        }).then(function (response) {
            deferred.resolve(response.data.addresses);
        }); 
        
        return deferred.promise;
    };
    
    this.getTicketsForAddresses = function(addresses) {
        var deferred = $q.defer();
        
        var promises = [];
        angular.forEach(addresses, function (address) {
            promises.push( that.getMyTickets(address) );
        });         
        
        $q.all(promises).then(function (results) {
            
            var assets = [];
            for (var i in results) {
                assets = assets.concat(results[i]);
            }
            deferred.resolve(assets);
        }, function (rejects) {
            console.warn(rejects);
            deferred.reject();
        });
        
        return deferred.promise;
    };
    
    this.fetchAssetInfo = function() {
        return $http({
            url: "/api/ticket_type.php",
            method: "GET",
            cache: true,
            responseType: "json",
        }).then(function(result) {
            var map = {};
            angular.forEach(result.data, function(item) {
                map[item.asset_id] = item;
            });
            return map;
        });
    };

    this.getMyTickets = function (address) {
        var deferred = $q.defer();
        var tickets = [];
        $http({
            method: "POST",
            data: {
                address: address,
            },
            url: "/api/addressinfo.php?address=" + address, // cache pr. URL I think
            cache: false,
        })
        .then(function (response) {
            angular.forEach(response.data.assets, function (asset) {
                for (var i = 0; i < asset.amount; i++) {
                    tickets.push(new Ticket(null, {
                        assetID: asset.assetId, 
                    }));
                }
            });
            deferred.resolve(tickets);
        }, function (reason) {
            console.warn(reason);
            deferred.resolve([]);
        });
        
        return deferred.promise;
    };
}

function Ticket(id, data) {
    this.id = id;
    this.name = null;
    if (data) {
        this.hydrate(data);
    }
}

Ticket.prototype.hydrate = function (data) {
    for (var i in data) 
        //if (this.hasOwnProperty(i)) 
    {
        this[i] = data[i];    
    }    
};


angular.module("app").service("MyTickets", MyTickets);