/**
 * Created by sergej on 06.11.15.
 */

(function() {
    'use strict';

    var includeModules = [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'ui.utils',
        'pascalprecht.translate',
        'angular-loading-bar',
        'angularBootstrapNavTree',
        'ui.tree',
        'Restangular'
    ];

    Array.prototype.last = function(){
        return this[this.length - 1];
    };

    angular.module('app',  includeModules)
        .config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('[[').endSymbol(']]');
        })
        .config(['$translateProvider', function($translateProvider) {
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.useStaticFilesLoader({
                prefix: 'bundles/app/translations/',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('ru');
        }])
})()