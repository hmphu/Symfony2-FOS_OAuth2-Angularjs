/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .factory('sidebarService', function($http) {
            var factory = {
                get: function() {
                    return $http.get(
                        'bundles/app/data/sidebar.json',
                        {
                            ignoreLoadingBar: true
                        }
                    )
                }
            };
            return factory
        })
})()