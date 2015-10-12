function TicketsPageController($log, $window, $q) {
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
    
    this.sendOff = function() {
        
    };
    
    this.print = function() {
        $window.print();
    }
}

TicketsPageController.prototype.buy = function (ticket) {
    this.buyTicket = ticket;
};

angular.module("app").controller("TicketsPageController", TicketsPageController);
