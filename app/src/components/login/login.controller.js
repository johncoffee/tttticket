function LoginController($log, Auth) {
    Auth.authenticated = false;
    
    this.login = function() {
        Auth.authenticated = true;
    }
}

angular.module("app").controller("LoginController", LoginController);
