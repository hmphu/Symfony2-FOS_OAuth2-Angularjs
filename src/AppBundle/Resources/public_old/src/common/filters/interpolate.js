/**
 * Created by sergej on 12.11.15.
 */

angular.module('filters.interpolate', [])
.filter('interpolate', ['version', function(version) {
    return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    }
}]);