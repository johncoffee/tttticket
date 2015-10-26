
function PaymentProvider($log) {
    
    var instanceMap = {};
    
    this.getInstance = function (name) {
        return instanceMap[name];
    };
    
    this.register = function (name, instance) {
        instanceMap[name] = instance;
    };
}


angular.module("app").service("PaymentProvider", PaymentProvider);
