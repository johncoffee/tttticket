function LoginController($log, Auth) {
    //Auth.authenticated = false;
    
    this.login = function() {
        Auth.admin = true;
    };
}

angular.module("app").controller("LoginController", LoginController);
