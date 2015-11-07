function PaymentController(CurrentUser,
                           Auth,
                           $http,
                           Shop,
                           $window) {
    
    var vm = this;
    vm.showSignUp = CurrentUser.isAuthenticated();
    var apiBase = "/api/";
    vm.buyTicket = null; // the object to hold the state
    this.step = 0;
    this.method = false;
    
    this.print = function() {
        $window.print();
    };
    
    this.signUp = function(email, password) {
        vm.buyTicket.wait = true;
        $http({
            method: "POST",
            url: "/api/signup.php",
            data: {
                email: email,
                password: password,
            },
            cache: false,
        })
        .then(function (response) {
            console.debug(response);
            if (response.data.loggedin) {
                Auth.user.id = response.data.loggedin;
                Auth.authenticated = true;
                vm.next();
            }
            else {
                console.warn('signup failed');    
            }
        })
        .finally(function () {
            vm.buyTicket.wait = false;
        });
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
            method: "POST",
            data: {
                ticketType: vm.buyTicket.ticketType,
            },
            cache: false,
            responseType: "application/json",
        })
        .then(function(response) {
            console.debug(response);
            var data = response.data;
            if (data.error) {
                console.warn(data);
            }
            else {
                vm.qpLink = data.qpLink;
                vm.transID = data.transID;
            }
        })
        .finally(function(){
            vm.buyTicket.wait = false;
        })
    };
    
    this.requestPayByCode = function (code, ticketTypeID) {
        vm.buyTicket.wait = true;
        $http({
            url: apiBase + "pay_by_code.php",
            method: "POST",
            data: {
                ticketTypeID: ticketTypeID,
                code: code,
            },
            cache: false,
            responseType: "application/json",
        })
        .then(function(response) {
                var data = response.data;
                vm.buyTicket.orderno = data.orderID;
                vm.next();
        })
        .finally(function(){
            vm.buyTicket.wait = false;
        })
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
            vm.buyTicket.wait = true;
            vm.requestStatus(transID).then(vm.onStatusResponse).finally(function () {
                vm.buyTicket.wait = false;
            });
        }, 4333);
    };

    this.onStatusResponse = function (response) {
        var data = response.data;
        var payment = data.payment;
        switch (payment.state) {
            case "initial":
                vm.pollStatus(vm.transID);
                break;
            case "processed":
                vm.buyTicket.orderno = payment.order_id; // response....
                vm.requestPayByCode(321, vm.buyTicket.ticketType);
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
            responseType: "json",
        });
    };
    
    this.setTicket = function (shopItemID) {
        Shop.getTickets().then(function (shopItems) {
            console.debug(shopItems, shopItemID);
            var ticketData = null;

            for (var i in shopItems) {
                if (shopItems[i].id == shopItemID) {
                    ticketData = shopItems[i];
                    break;
                }
            }
            vm.buyTicket = {
                shopItemID: ticketData.shopItemID,
                price: ticketData.price_currency + ' ' + ticketData.price_amount,
                title: ticketData.title,
                ticketType: ticketData.ticket_type,
            };
        });
        vm.buyTicket = {
            wait: true,
        };
    };
}

angular.module("app").controller("PaymentController", PaymentController);
