(function () {
    'use strict';

    angular.module('app')
        .factory('userService', userService);

    userService.$inject = ['$http' , '__env'];

    function userService($http , __env) {

        var service = {};

        service.getUserList = function () {
            var promise = $http.get(__env.dataServerUrl + '/user/list')
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        service.updateuser = function (id , user) {
            var promise = $http.put(__env.dataServerUrl + '/user/updateDetails/' + id , user)
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