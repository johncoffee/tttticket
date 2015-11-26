function SimpleScannerController($log, $scope) {
    var vm = this;

    vm.onSuccess = function(data) {
        console.log(data);
        if (data.length == 52) {
            vm.onValid(data);
        }
    };
    vm.onError = function(error) {
        console.log(error);
    };
    vm.onVideoError = function(error) {
        console.log(error);
    };
    
    vm.onValid = function (wip) {
        $scope.onFoundWip({wip: wip});
    };

}

angular.module("app").controller("SimpleScannerController", SimpleScannerController);
