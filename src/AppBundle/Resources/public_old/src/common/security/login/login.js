/**
 * Created by sergej on 12.11.15.
 */

angular.module('security.login', ['security.service', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/bundles/app/src/common/security/login/login.tpl.html',
            controller: 'LoginCtrl'
        });
    }])
    .controller('LoginCtrl', ['$rootScope', '$scope', '$window', '$cookies', 'Salt', 'Digest', function($rootScope, $scope, $window, $cookies, Salt, Digest) {
        // On Submit function
        $scope.getSalt = function() {
            var username = $scope.login;
            var password = $scope.password;
            // Get Salt
            Salt.get({username:username}, function(data){
                var salt = data.salt;
                // Encrypt password accordingly to generate secret
                Digest.cipher(password, salt).then(function(secret){
                    // Display salt and secret for this example
                    $scope.salt = salt;
                    $scope.secret = secret;
                    // Store auth informations in cookies for page refresh
                    $cookies.username = $scope.username;
                    $cookies.secret = secret;
                    // Store auth informations in rootScope for multi views access
                    $rootScope.userAuth = {username: $scope.username, secret : $scope.secret};
                }, function(err){
                    console.log(err);
                });
            });
        };
    }]);