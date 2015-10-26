function PaymentController($log, 
                           Auth,
                           $timeout) {
    
    var vm = this;
    vm.isLoggedIn = Auth.authenticated;
    var apiBase = "/api/";
    vm.buyTicket = null; // the object to hold the state
    this.step = 0;
    
    this.print = function() {
        $window.print();
    };
    
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
                vm.buyTicket.wait = false;
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
    
    this.setTicket = function (ticket) {
        vm.buyTicket = angular.extend({}, ticket);    
    };
}

angular.module("app").controller("PaymentController", PaymentController);
