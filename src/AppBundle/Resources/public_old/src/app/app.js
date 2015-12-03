/**
 * Created by sergej on 06.11.15.
 */
'use strict';

var includeModules = [
    'ngRoute',
    'restangular',
    'pascalprecht.translate',
    'angular-loading-bar',
    'shared.sidebar',
    'directives.appVersion',
    'security.login'
];

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}

angular.module('app',  includeModules)
    .config(['$routeProvider', function($routeProvider) {

    }])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    })
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useStaticFilesLoader({
            prefix: 'bundles/app/src/translations/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ru');
    }])
    .config(['RestangularProvider', function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/');
        RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
            if (operation == 'getList') {
                return _.toArray(response[what]);
            } else {
                return response;
            }
        });
        RestangularProvider.addRequestInterceptor(function(element, operation, what, url) {
            var newRequest = {};
            if (operation == 'post' || operation == 'put') {
                what = what.split('');
                what.pop();
                what = what.join('');
            }
            if (operation == 'put') {
                delete element._links;
            }
            newRequest[what] = element;
            return newRequest;
        });
        RestangularProvider.setRestangularFields({
            selfLink: '_links.self.href'
        });
        RestangularProvider.setDefaultRequestParams('get', {limit: 100});
    }])
    .run(function($rootScope) {
        /* var pageType
         * value:
         * 1 - with sidebar
         * 2 - without sidebar
         */
        $rootScope.pageType = 1;
        $rootScope.bodyClass = 'skin-blue';
        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
            switch(currentRoute.templateUrl.split('/').last()) {
                case 'login.tpl.html':
                case 'register.html':
                case 'forgotpassword.html':
                    $rootScope.pageType = 2;
                    $rootScope.bodyClass = 'hold-transition login-page';
                    break;
                default:
                    $rootScope.pageType = 1;
                    $rootScope.bodyClass = 'skin-blue';
                    break;
            }
        });
    });