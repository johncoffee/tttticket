function TicketsPageController($log, $window, $q, $timeout) {
    var vm = this;

    this.tickets = [
        {
            name: "Nordic Game Jam 2016",
            price: "DKK 700,00",
            
            regno: 1234,
            cardno: "1000 0000 0000 0008",
            expm: 12,
            expy: 12,
            
        },
    ];
    
    this.paymentOptions = [
        {
            name: "mobile pay",
        },
        {
            name: "VISA card",
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

    vm.reset();
}

TicketsPageController.prototype.buy = function (ticket) {
    this.step = 1;
    this.buyTicket = ticket;
};

TicketsPageController.prototype.reset = function () {
    this.buyTicket = angular.copy(this.tickets[0]);
};

angular.module("app").controller("TicketsPageController", TicketsPageController);
