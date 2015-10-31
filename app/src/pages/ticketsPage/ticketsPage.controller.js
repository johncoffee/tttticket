function TicketsPageController($log, 
                               $http,
                               $window,
                               $q, 
                               $timeout,
                               Auth,
                               PaymentProvider) {
    var vm = this;
    vm.paymentFlowName = "checkout";
    
    this.onTicketClick = function (ticket) {
        this.buyTicket = angular.copy(ticket);
        PaymentProvider.getInstance(vm.paymentFlowName).setTicket(ticket);
    };  
}

angular.module("app").controller("TicketsPageController", TicketsPageController);
