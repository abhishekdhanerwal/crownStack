(function () {
    'use strict';

    angular.module('app')
        .factory('machineTypeService', machineTypeService);

    machineTypeService.$inject = ['$http'];

    function machineTypeService($http) {

        var service = {};

        service.getData = function () {
            var promise = $http.get('../../machine-type.json')
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        }

        return service;

    }
}())