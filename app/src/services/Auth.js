/**
 * Auth
 * @constructor
 */
function Auth() {
    this.user = new User();
    this.storage = (localStorage[this.localStorageKey]) ? localStorage : sessionStorage;
    
    if (this.storage[this.localStorageKey]) {
        try {
            var recovered = JSON.parse(this.storage[this.localStorageKey]);
            this.user.roles = recovered.roles;
            this.user.id = recovered.id;
        }
        catch (e) {
            console.warn(e);
        }
    }
}

Object.defineProperties(Auth.prototype, {
    admin: {
        set: function (value) {
            this.user.roles.admin = value;
            this.persistState();
        },
        get: function () {
            return this.user.roles.admin;
        }
    },
    authenticated: {
        set: function (value) {
            if (!value) {
                this.destroySession();
            }
            else {
                this.user.roles.authenticated = true;
                this.persistState();
            }
        },
        get: function () {
            return this.user.roles.authenticated;
        }
    },
    rememberMe: {
        set: function (value) {
            this.storage = (value) ? localStorage : sessionStorage;
        }
    },
    localStorageKey: {
        value: "roles",
    },
});

Auth.prototype.persistState = function () {
    this.storage[this.localStorageKey] = this.user.serialize();
};

Auth.prototype.destroySession = function () {
    this.user = new User();
    localStorage.removeItem(this.localStorageKey); 
    sessionStorage.removeItem(this.localStorageKey);
};

function User() {
    this.id = -1;
    this.roles = {};
}

User.prototype.serialize = function () {
    return JSON.stringify(this);
};

angular.module('app').service('Auth', Auth);
