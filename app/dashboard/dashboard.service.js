(function () {
    'use strict';

    angular.module('app')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$http' , '__env'];

    function dashboardService($http , __env) {

        var service = {};

        service.getQuestions = function () {
            var promise = $http.get(__env.dataServerUrl + '/questions/view')
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        service.updateQuestion = function (time , question) {
            var promise = $http.put(__env.dataServerUrl + '/questions/update?time=' + time , question)
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        return service;

    }
}())