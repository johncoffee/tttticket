function TicketsPageController($log, 
                               $http,
                               $window,
                               $q, 
                               $timeout,
                               Auth) {
    var vm = this;
    var apiBase = "//localhost:8080/api/";
    
    vm.isLoggedIn = Auth.authenticated;
    
    this.step = 0;
    
    this.tickets = [
        {
            name: "Nordic Game Jam 2016",
            price: "DKK 700,00",
        },
    ];
    
    this.loadLast = function () {
        buyAndAuth({
            cardno: vm.buyTicket.cardno,
            regno: vm.buyTicket.regno,

            email: vm.buyTicket.email,
        })
        .then(function (result) {
            vm.buyTicket.orderno = result.orderno;
        });
    };
    function buyAndAuth() {
        var deferred = $q.defer();
        $timeout(function () {
            var respMock = {
                orderno: 42,
            };
            deferred.resolve(respMock);
        }, 333);
        
        return deferred.promise;
    }
    
    this.print = function() {
        $window.print();
    };
    
    var _state = {};
    Object.defineProperty(this, "state", {
        get: function () {
            return _state;    
        },    
    });
    
    this.signUp = function(email, password) {
        vm.buyTicket.wait = true;
        $timeout(function () {
            vm.buyTicket.wait = false;
            vm.next();
        }, 666);
    };
    
    this.next = function () {
        vm.step++;
    };
    
    this.requestLink = function() {
        vm.buyTicket.wait = true;

        //test
        //vm.qpLink = 42;
        //vm.transID = 42;
        //vm.buyTicket.wait = false;
        //return;
        
        $http({
            url: apiBase + "request.php",
            method: "GET",
            params: {
                ticket_type: 2,
            },
            cache: false,
            responseType: "application/json",
        })
        .success(function(response) {
            vm.buyTicket.wait = false;
                
            console.debug(response);
            if (response.error) {
                console.warn(response);
            }
            else {
                vm.qpLink = response.qpLink;    
                vm.transID = response.transID;    
            }
        })
        .error(function () {
            vm.buyTicket.wait = false;
            console.warn("sheit");
        });    
    };
    
    this.qpCheckout = function () {
        window.open(vm.qpLink, "_blank");
        vm.buyTicket.wait = true;
        setTimeout(function () {
            vm.pollStatus(vm.transID);    
        }, 10 * 1000);
        // test
        //vm.onStatusResponse({payment: {state: "processed"} });
    };
    
    var handle = null;
    this.pollStatus = function (transID) {
        clearTimeout(handle);
        handle = setTimeout(function () {
            vm.requestStatus(transID).success(vm.onStatusResponse);
        }, 4333);
    };
    
    this.onStatusResponse = function (response) {
        console.debug(response);
        var payment = response.payment;
        switch (payment.state) {
            case "initial":
                vm.pollStatus(vm.transID);
                break;
            case "processed":
                console.debug("processed!!");
                vm.buyTicket.orderno = 42; // response....
                vm.next();
                break;
        }
    };

    this.requestStatus = function (id) {
        return $http({
            url: apiBase + "status.php",
            method: "GET",
            params: {
                id: id,
            },
            cache: false,
            responseType: "application/json",
        });
    };

    vm.reset();
}

TicketsPageController.prototype.reset = function () {
    this.buyTicket = angular.copy(this.tickets[0]);
};

angular.module("app").controller("TicketsPageController", TicketsPageController);
