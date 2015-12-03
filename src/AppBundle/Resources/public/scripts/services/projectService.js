/**
 * Created by sergej on 19.11.15.
 */

(function() {
    'use strict';

    angular.module('app')
        .factory('projectService', projectService);

    projectService.$inject = ['dpd', '$http', 'dpdConfig'];

    function projectService(dpd, $http, dpdConfig){
        projectService = this;

        projectService.create = create;

        return projectService;

        function create(title, type) {
            var data = {
                title: title,
                type: type,
                ignoreLoadingBar: true
            };
            return $http.post(dpdConfig.serverRoot + 'api/projects', data).then(
                function(session, error) {
                    if (error) {
                        console.log(error.message);
                        return false;
                    } else {
                        return data;
                    }
                }
            );
        }
    }
})()
