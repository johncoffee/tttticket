angular
    .module('app')
    .config(function($mdThemingProvider){
        
        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('pink');


    });
