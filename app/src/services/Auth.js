// authentication and authorization rules

/**
 * @class Auth
 * @constructor
 */
function Auth () {
    this.user = new Auth.User();
}

Object.defineProperties(Auth.prototype, {
    admin: {
        set: function (value) {
            this.user.roles.admin = value;
            if (value) {
                this.authenticated = true;
            }
        },
        get: function () {
            return this.user.roles.admin;
        }
    },
    authenticated: {
        set: function (value) {
            this.user.roles.authenticated = value;
            if (!value) {
                this.user = new Auth.User();
            }
        },
        get: function () {
            return this.user.roles.authenticated;
        }
    }
});

Auth.User = function User() {
    this.roles = {};
};


angular.module('app')
    .service('Auth', Auth);