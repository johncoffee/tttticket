function PrivateWipLookupController($http, $q) {
    var vm = this;
    var cancelRequest = null;
    
    vm.setPrivateWip = function (privateWip) {
        vm.info = "";
        if (cancelRequest) {
            cancelRequest.resolve(); // cancel hanging request
        }
        cancelRequest = $q.defer();
        $http({
            method: "POST",
            url: "api/checkin_info.php",
            data: {
                privateWip: privateWip,
            },
            timeout: cancelRequest.promise,
            cache: false,
        }).then(function (response) {
            vm.info = response.data.info;
            vm.userID = vm.info.user_id;
            vm.ticketID = vm.info.ticket_id;
        },
        function (response) {
            if (response.status != -1) {
                console.warn(response);
            }
        });
    };
    
    vm.plunder = function (userID, ticketID) {
        $http({
            method: "POST",
            url: "api/transfer.php",
            data: {
                ticketID: ticketID,
                userID: userID, 
            },
            cache: false,
        }).then(function() {
            console.log("success");
        });
    };
}

angular.module("app").controller("PrivateWipLookupController", PrivateWipLookupController);
