function LoginController($log, $http, Auth, $location) {
    var vm = this;
    
    this.login = function() {
        Auth.rememberMe = this.rememberMe;
      
        $http({
            url: "/api/login.php",
            method: "POST",
            data: {
                username: vm.username,
                password: vm.password,
            },             
            cache: false,
            responseType: "json",
        })
        .then(function (response) {
            if (response.data.loggedin) {
                Auth.authenticated = true;
                Auth.user.id = response.data.loggedin;
                Auth.admin = response.data.admin;
                $location.path("/me");
            }
        });
    };
}

angular.module("app").controller("LoginController", LoginController);
