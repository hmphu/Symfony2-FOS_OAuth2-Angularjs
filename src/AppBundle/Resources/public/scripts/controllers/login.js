/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'userService', '$state'];

    function loginCtrl($scope, userService, $state) {
        $scope.signupTemp = function () {
            userService.signupTemp().then(function(data) {
                if (data) {
                    $state.go('dashboard.discover.name');
                }
            });
        };

        $scope.login = function () {
            var username = $scope.username;
            var password = $scope.password;
            if (username !== "" && password !== "") {
                userService.login(username, password).then(function(data) {
                    if (data) {
                        $state.go('dashboard.main');
                    }
                });
            }
        };
    }
})();