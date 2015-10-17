function TicketsPageController($log, $window, $q, $timeout) {
    var vm = this;

    this.tickets = [
        {
            name: "Nordic Game Jam 2016",
            price: "DKK 700,00",
        },
    ];
    
    this.buyTicket = this.tickets[0];
    
    this.paymentOptions = [
        {
            name: "mobile pay",
        },
        {
            name: "mobile pay",
        }
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

    this.reset();
}

TicketsPageController.prototype.buy = function (ticket) {
    this.buyTicket = ticket;
};

TicketsPageController.prototype.reset = function () {
    this.buyTicket = angular.copy(this.tickets[0]);
};

angular.module("app").controller("TicketsPageController", TicketsPageController);
