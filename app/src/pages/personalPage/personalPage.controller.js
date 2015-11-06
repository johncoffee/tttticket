function PersonalPageController($log, MyTickets) {
    var vm = this;
    vm.addresses = [];
    
    vm.addAddress = function (address) {
        vm.addresses.push(address);            
        console.debug(vm.addresses);
    };
    
    MyTickets.getMyAddresses().then(function (addresses) {
        angular.forEach(addresses, function (item) {
           vm.addAddress(item.address); 
        });
        console.log(vm.addresses)
    });
}

angular.module("app").controller("PersonalPageController", PersonalPageController);
