// stateless services

function AssetInfo($q, Auth, $http) {
    var that = this;


    this.getTicketsForAddresses = function(addresses) {
        var deferred = $q.defer();

        var promises = [];
        angular.forEach(addresses, function (address) {
            promises.push( that.fetchTicketsOnAddress(address) );
        });

        $q.all(promises).then(function (results) {
            var map = {};
            
            angular.forEach(results, function (tickets, addressPubKey) {
                angular.forEach(tickets, function (ticket) {
                    if (!map[ticket.address]) {
                        map[ticket.address] = [];
                    }
                    map[ticket.address].push(ticket);
                });
            });     
            deferred.resolve(map);
        }, function (rejects) {
            console.warn(rejects);
            deferred.reject();
        });

        return deferred.promise;
    };
    
    this.fetchTicketsOnAddress = function (address) {
        var deferred = $q.defer();
        var tickets = [];
        $http({
            method: "GET",
            params: {
                address: address,
            },
            url: "/api/cc_addressinfo.php",
        })
        .then(function (response) {
            angular.forEach(response.data.assets, function (asset) {
                for (var i = 0; i < asset.amount; i++) {
                    tickets.push({
                        assetID: asset.assetId,
                        address: address,
                    });
                }
            });
            deferred.resolve(tickets);
        }, function (reason) {
            deferred.reject();
        });

        return deferred.promise;
    };
    
    this.fetchTicketTypes = function () {
        return $http({
            url: "api/ticket_type.php",
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

    this.getMyAddresses = function (userID) {
        var deferred = $q.defer();
        $http({
            url: "/api/addresses.php",
            method: "GET",
            cache: false,
            responseType: "json",
            params: {
                userID: userID,
            }
        }).then(function (response) {
            var map = {};
            angular.forEach(response.data.addresses, function(address) {
                map[address.address] = address; 
            });
            deferred.resolve(map);
        });

        return deferred.promise;
    };
    
}

angular.module("app").service("AssetInfo", AssetInfo);