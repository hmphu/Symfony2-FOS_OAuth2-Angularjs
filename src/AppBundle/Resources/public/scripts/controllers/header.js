/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .controller('HeaderCtrl', headerCtrl);

    headerCtrl.$inject = ['$scope', 'userService', '$state'];

    function headerCtrl($scope, userService, $state) {
        $scope.logout = function(){
            userService.logout(); // this resets the sid cookie
            $state.go("core.login");
        }
    }
})()