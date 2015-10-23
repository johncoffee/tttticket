function LoginController($log, Auth) {
    
    this.login = function() {
        Auth.rememberMe = this.rememberMe;
        
        Auth.authenticated = true;
        
        if (this.username == "admin") {
            Auth.admin = true;
        }
        else if (this.username == "test") {
            Auth.test = true;
        }
    };
}

angular.module("app").controller("LoginController", LoginController);
