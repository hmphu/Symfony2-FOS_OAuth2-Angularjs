/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .factory('digestService', ['$q', function($q) {
            var factory = {
                // Symfony SHA512 encryption provider
                cipher: function(secret, salt) {
                    var deferred = $q.defer();

                    var salted = secret + '{' + salt + '}';
                    var digest = CryptoJS.SHA512(salted);
                    for (var i=1; i<5000; i++) {
                        digest = CryptoJS.SHA512(digest.concat(CryptoJS.enc.Utf8.parse(salted)));
                    }
                    digest = digest.toString(CryptoJS.enc.Base64);

                    deferred.resolve(digest);
                    return deferred.promise;
                },
                // Default Symfony plaintext encryption provider
                plain: function(secret, salt) {
                    var deferred = $q.defer();

                    var salted = secret + '{' + salt + '}';
                    var digest = salted;

                    deferred.resolve(digest);
                    return deferred.promise;
                }
            };
            return factory;
        }])
})()