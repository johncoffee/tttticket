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
    this.rolesKey = "roles";
    this.roles = {};
    
    if (sessionStorage[this.rolesKey]) {
        try {
            this.user = JSON.parse(sessionStorage[this.rolesKey]);
        }
        catch (e) {
            console.warn(e);
        }
    }
    
    this.persist = function () {
        sessionStorage[this.rolesKey] = JSON.stringify(this.roles);
    };
    this.destroySession = function () {
        this.roles = {};    
        sessionStorage.removeItem(this.rolesKey);
    };
};


angular.module('app')
    .service('Auth', Auth);