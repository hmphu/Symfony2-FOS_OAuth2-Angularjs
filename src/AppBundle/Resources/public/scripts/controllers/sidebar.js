/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('SidebarCtrl', sidebarCtrl);

    sidebarCtrl.$inject = ['$scope', 'sidebarService'];

    function sidebarCtrl($scope, sidebarService) {
        sidebarService.get().success(function(data) {
            data = data || {};
            $scope.menus = data.sidebar || [];
        })
    }
})()