angular
    .module('app')
    .config(function($mdThemingProvider) {
        
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('cyan');
    });
