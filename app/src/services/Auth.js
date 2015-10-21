
function Auth() {
    this.destroySession();

    if (sessionStorage[this.localStorageKey]) {
        try {
            var recovered = JSON.parse(sessionStorage[this.localStorageKey]);
            this.user.roles = recovered.roles;
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
                this.user.roles.authenticated = value;
                this.persistState();
            }
        },
        get: function () {
            return this.user.roles.authenticated;
        }
    },
    localStorageKey: {
        value: "roles",
    },
});

Auth.prototype.persistState = function () {
    sessionStorage[this.localStorageKey] = this.user.serialize();
};

Auth.prototype.User = User;

Auth.prototype.destroySession = function () {
    this.user = new User();
    sessionStorage.removeItem(this.localStorageKey);
};

function User() {
    this.roles = {};
}

User.prototype.serialize = function () {
    var result = null;
    try {
        result = JSON.stringify(this);
    }
    catch (e) {
        console.warn(e);
    }
    return result;
};

angular.module('app').service('Auth', Auth);
