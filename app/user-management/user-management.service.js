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

        service.getPaytmRequest = function () {
            var promise = $http.get(__env.dataServerUrl + '/payment/list?type=paytm&status=pending')
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };

        service.getBankRequest = function () {
            var promise = $http.get(__env.dataServerUrl + '/payment/list?type=bank&status=pending')
                .then(
                    function (data) {
                        return data;
                    },
                    function (errors) {
                        return errors;
                    });
            return promise;
        };


        service.getCompletedPayment = function () {
            var promise = $http.get(__env.dataServerUrl + '/payment/list?status=done')
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

        service.updatePayment = function (id , user) {
            var promise = $http.put(__env.dataServerUrl + '/payment/update/' + id , user)
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