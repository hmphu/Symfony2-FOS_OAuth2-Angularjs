/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('MainCtrl', function ($scope) {
            $scope.main = {
                title: 'Mobium Panel',
                settings: {}
            };
        });
})()