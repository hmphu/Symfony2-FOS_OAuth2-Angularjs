/**
 * Created by sergej on 12.11.15.
 */

angular.module('directives.appVersion', ['services.appVersion', 'filters.interpolate'])
.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
        elm.text(version);
    };
}]);