function PersonalPageController($log, AssetInfo, CurrentUser) {
    var vm = this;
    vm.addresses = [];
    
    vm.addAddress = function (address) {
        vm.addresses.push(address);            
        console.debug(vm.addresses);
    };
    
    AssetInfo.getMyAddresses(CurrentUser.getID()).then(function (addresses) {
        angular.forEach(addresses, function (item) {
           vm.addAddress(item.address); 
        });
    });
}

angular.module("app").controller("PersonalPageController", PersonalPageController);
