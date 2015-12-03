/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', router]);

    function router($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        var prefix = 'bundles/app/';

        $stateProvider
            .state('dashboard', {
                abstract: true,
                templateUrl: prefix + 'views/tmpl/dashboard.html'
            })
            //dashboard
            .state('dashboard.main', {
                url: '/',
                controller: 'DashboardCtrl',
                templateUrl: prefix + 'views/tmpl/main.html',
            })
            .state('dashboard.discover', {
                abstract: true,
                controller: 'DiscoverCtrl',
                templateUrl: prefix + 'views/tmpl/discover.html',
            })
            .state('dashboard.discover.name', {
                url: '/discover',
                templateUrl: prefix + 'views/tmpl/discover-name.html',
            })
            .state('dashboard.discover.content', {
                templateUrl: prefix + 'views/tmpl/discover-content.html',
            })
            .state('dashboard.discover.create', {
                templateUrl: prefix + 'views/tmpl/discover-create.html',
            })
            .state('dashboard.project', {
                url: 'project/:id'
            })
            //app core pages (errors, login,signup)
            .state('core', {
                abstract: true,
                template: '<div ui-view></div>'
            })
            //login
            .state('core.login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: prefix + 'views/tmpl/pages/login.html'
            })
            //signup
            .state('core.signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: prefix + 'views/tmpl/pages/signup.html'
            })
            //forgot password
            .state('core.forgotpass', {
                url: '/forgotpass',
                controller: 'ForgotPasswordCtrl',
                templateUrl: prefix + 'views/tmpl/pages/forgotpass.html'
            })
            //page 404
            .state('core.page404', {
                url: '/page404',
                templateUrl: prefix + 'views/tmpl/pages/page404.html'
            })
    }
})()