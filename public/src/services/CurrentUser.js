/**
 * Information about the current user
 * @param {Auth} Auth
 * @constructor
 */
function CurrentUser(Auth) {

    this.getID = function () {
        return Auth.user.id;
    };
    
    this.getEmail = function () {
        return Auth.user.id;
    };

    this.isAdmin = function () {
        return Auth.user.roles.admin;
    };
    
    this.isAuthenticated = function () {
        return Auth.user.roles.authenticated;
    };
}

angular.module('app').service('CurrentUser', CurrentUser);

