angular
    .module('app', [
        'ngMaterial',
        'googlechart',
        'ngRoute',
    ]);

angular
    .module('app')
    .config(function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    });
