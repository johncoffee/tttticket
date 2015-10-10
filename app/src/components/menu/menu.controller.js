function MenuController($log, Auth) {
    
    Object.defineProperties(this, {
        isLoggedIn: {
            get: function () {
                return Auth.authenticated;
            }
        },
        isAdmin: {
            get: function () {
                return Auth.admin;
            }
        }
    })
}


angular.module("app").controller("MenuController", MenuController);
