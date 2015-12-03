/**
 * Created by sergej on 20.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('DiscoverCtrl', discoverCtrl);

    discoverCtrl.$inject = ['$scope', 'userService', '$state'];

    function discoverCtrl($scope, projectService, $state) {
        $scope.data = {};

        // function to process the form
        $scope.createApp = function() {
            projectService.create($scope.data.name, $scope.data.type).then(function() {
                $state.go('dashboard.project', {id: data.id});
            });
        };
    }
})()