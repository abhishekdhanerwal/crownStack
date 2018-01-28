(function () {
    'use strict';

    angular.module('app')
        .factory('machineService', machineService);

    machineService.$inject = ['$http'];

    function machineService($http) {

        var service = {};

        service.getData = function () {
            var promise = $http.get('../../machine.json')
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