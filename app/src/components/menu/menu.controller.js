function MenuController($log, Auth) {
    
    Object.defineProperties(this, {
        isLoggedIn: {
            get: function () {
                return Auth.authenticated;
            }
        }
    })
}


angular.module("app").controller("MenuController", MenuController);
