function Shop($log, $q, $http) {
    
    this.getTickets = function (type) {
        return $http({
            method: "GET",
            url: "/api/tickets.php",
            cache: true,
            params: {
                type: type,
            }
        })
        .then(function (result) {
            return result.data.tickets;
        });
    };
}


angular.module("app").service("Shop", Shop);
