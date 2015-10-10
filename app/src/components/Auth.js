// authentication and authorization rules

function Auth () {
    this.user = new Auth.User();
}

Object.defineProperties(Auth.prototype, {
    admin: {
        set: function (value) {
            this.user.roles.admin = value;
        },
        get: function () {
            return this.user.roles.admin;
        }
    },
    authenticated: {
        set: function (value) {
            this.user.roles.authenticated = value;
            if (!value) {
                this.admin = false;
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