
angular.module('app')
    .config(function($httpProvider) {
        $httpProvider.defaults.responseType = "json";
        
        console.debug($httpProvider.defaults)
    });