/**
 * Created by sergej on 12.11.15.
 */

angular.module('shared.sidebar', [])
    .controller('SidebarCtrl', ['$scope', 'sidebarService', function($scope, sidebarService) {
        sidebarService.get().success(function(data, status, headers, config) {
            data = data || {};
            $scope.menus = data.sidebar || [];
        });
    }])
    .factory('sidebarService', function($http) {
        var factory = {
            get: function() {
                return $http.get('/bundles/app/src/app/shared/sidebar/sidebar.json')
            }
        };
        return factory
    })
    .directive('sidebar', function(){
        return {
            restrict: 'AC', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: '/bundles/app/src/app/shared/sidebar/sidebar.tpl.html',
            scope: true,
            transclude : false,
            controller: 'SidebarCtrl'
        };
    })
    .directive('treeview', [function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            // templateUrl: '',
            // replace: true,
            // transclude: true,
            link: function ($scope, iElm, iAttrs, controller) {
                // if (iAttrs.hasOwnProperty())
            }
        };
    }]);