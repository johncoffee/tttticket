function LoginController($log, $http, Auth) {
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
            console.debug(response.data);
            Auth.authenticated = response.data.loggedin;
            Auth.admin = response.data.admin;
        });
    };
}

angular.module("app").controller("LoginController", LoginController);
