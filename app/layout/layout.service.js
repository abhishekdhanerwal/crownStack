(function () {
    'use strict';

    angular.module('app')
        .factory('navService', navService);

    navService.$inject = ['$http'];

    function navService($http) {

        var service = {};

        service.getData = function () {
            var promise = $http.get('../../data.json')
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