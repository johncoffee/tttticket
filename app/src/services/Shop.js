function Shop($log, $q, $http) {
    
    this.getTickets = function () {
        return $http({
            method: "GET",
            url: "/api/shop.php",
            cache: true,
        })
        .then(function (result) {
            return result.data.tickets;
        });
    };
}


angular.module("app").service("Shop", Shop);
