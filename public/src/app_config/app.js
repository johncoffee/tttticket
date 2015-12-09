angular
    .module('app', [
        'ngMaterial',
        'googlechart',
        'ngRoute',
        'ja.qr',
        'qrScanner',
    ]);

angular
    .module('app')
    .config(function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    });
