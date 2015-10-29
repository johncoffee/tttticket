/**
 * 
 * @param $log
 * @param {Auth} Auth
 * @constructor
 */
function MenuController($log, Auth, $http) {

    this.logout = function() {
        $http({
            method: "get",
            cache: false,
            url: "/api/logout.php",
        })
        .then(function () {
            Auth.authenticated = false;
        });
    };

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
    });
}


angular.module("app").controller("MenuController", MenuController);
