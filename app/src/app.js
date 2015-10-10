angular
    .module('app', ['ngMaterial', 'ngRoute']);

angular
    .module('app')
    .config(function($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    });
