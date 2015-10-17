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
            this.user.persist();
        },
        get: function () {
            return this.user.roles.admin;
        }
    },
    authenticated: {
        set: function (value) {
            this.user.roles.authenticated = value;
            if (!value) {
                this.user.destroySession();
            }
            else {
                this.user.persist();
            }
        },
        get: function () {
            return this.user.roles.authenticated;
        }
    }
});

Auth.User = function User() {
    this.roles = sessionStorage.user ? JSON.parse(sessionStorage.user) : {};
    console.log("roles",this);
    this.persist = function () {
        setTimeout(function () {
            sessionStorage.user = JSON.stringify(this.roles);
        },0);
    };
    this.destroySession = function () {
        this.roles = {};    
        this.persist();
    };
};




angular.module('app')
    .service('Auth', Auth);