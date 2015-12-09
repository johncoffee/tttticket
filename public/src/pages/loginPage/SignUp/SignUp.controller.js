function SignUpController($log,
                          $q, 
                          $http, 
                          $timeout, 
                          $routeParams) {
    var vm = this;
    
    vm.state = "form";
    vm.username = "";
    vm.password = "";
    
    vm.signup = function () {
        $timeout(function () {
            vm.state = "pending";        
        }, 666);
    };
    
    if ($routeParams.search().token) {
        vm.state = "validate";
    }
}

angular.module("app").controller("SignUpController", SignUpController);
