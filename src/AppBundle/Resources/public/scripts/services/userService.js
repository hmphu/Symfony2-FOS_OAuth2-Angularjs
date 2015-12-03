/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .factory('userService', userService);

    userService.$inject = ['dpd', '$http', 'dpdConfig', '$state', '$cookies', 'digestService'];

    function userService(dpd, $http, dpdConfig, $state, $cookies, digestService){
        userService = this;

        userService.login = login;
        userService.signup = signup;
        userService.signupTemp = signupTemp;
        userService.logout = logout;
        userService.init = init;

        userService.init();

        return userService;

        function init(){
            if ((typeof $cookies.get('username') === 'undefined') && (typeof $cookies.get('secret') === 'undefined')) {
                $state.go('core.login');
            }
        }

        function login(username, password){
            return $http.post(dpdConfig.serverRoot + 'users/login', {username: username, ignoreLoadingBar: true}).then(
                function(session, error) {
                    if (error) {
                        console.log(error.message);
                        return false;
                    } else {
                        var salt = session.data.salt;
                        var uid = session.data.id;
                        // Encrypt password accordingly to generate secret
                        return digestService.cipher(password, salt).then(function(secret) {
                            // Store auth informations in cookies for page refresh
                            $cookies.put('id', uid);
                            $cookies.put('username', username);
                            $cookies.put('secret', secret);

                            return true;
                        }, function(err){
                            console.log(err);
                            return false;
                        });
                    }
                }
            );
        } // end login

        function signup(username, password) {
            return $http.post(dpdConfig.serverRoot + 'users/signup', {username: username, password: password, ignoreLoadingBar: true}).then(
                function(session, error) {
                    if (error) {
                        console.log(error.message);
                        return false;
                    } else {
                        return true;
                    }
                }
            );
        } //end signup

        function signupTemp() {
            return $http.post(dpdConfig.serverRoot + 'users/signup/temp', {ignoreLoadingBar: true}).then(
                function(session, error) {
                    if (error) {
                        alert(error.message);
                        return false;
                    } else {
                        return login(session.data.username, session.data.password);
                    }
                }
            );
        } //end regTemp

        function logout(){
            $cookies
                .remove('id')
                .remove('username')
                .remove('secret');

            return true;
        } // end login

    }
})()