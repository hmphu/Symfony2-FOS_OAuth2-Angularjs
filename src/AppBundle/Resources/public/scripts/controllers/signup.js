/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('SignupCtrl', signupCtrl);

    signupCtrl.$inject = ['$scope', 'userService', '$state'];

    function signupCtrl($scope, userService, $state) {
        $scope.signup = function () {
            var username = $scope.username;
            var password = $scope.password;
            if (username !== "" && password !== "") {
                userService.signup(username, password).then(function(data) {
                    if (data) {
                        $state.go('core.login');
                    }
                });
            }
        };
    }
})();
