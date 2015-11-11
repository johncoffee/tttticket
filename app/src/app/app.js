angular
    .module('app', [
        'ngMaterial',
        'googlechart',
        'ngRoute',
        'ja.qr',
    ]);

angular
    .module('app')
    .config(function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    });
