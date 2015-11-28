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
            var assets = [];
            angular.forEach(results, function (result) {
                assets = assets.concat(result);
            });     
            deferred.resolve(assets);
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
            method: "POST",
            data: {
                address: address,
            },
            url: "/api/cc_addressinfo.php?address=" + address, // cache pr. URL I think
            cache: false,
        })
        .then(function (response) {
            angular.forEach(response.data.assets, function (asset) {
                for (var i = 0; i < asset.amount; i++) {
                    tickets.push({
                        assetID: asset.assetId,
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
            cache: true,
            responseType: "json",
            params: {
                userID: userID,
            }
        }).then(function (response) {
            deferred.resolve(response.data.addresses);
        });

        return deferred.promise;
    };
    
}

angular.module("app").service("AssetInfo", AssetInfo);