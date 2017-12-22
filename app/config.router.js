(function () {
    'use strict';

    angular.module('app')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider'];

    function routerConfig($stateProvider) {

        $stateProvider.state('app', {
            url : "/app",
            abstract : true,
            templateUrl : "app/layout/layout.html",
            controller : "LayoutCtrl",
            controllerAs : "vm"

        }).state('app.welcome', {
            url : "/welcome",
            templateUrl : "app/welcome/welcome.html"
        }).state('app.machine', {
            url : "/machine/:id",
            templateUrl : "app/machines/machines.html",
            controller: "MachineCtrl",
            controllerAs : "vm"
        }).state('app.machineType', {
            url : "/machine/types/:id",
            templateUrl : "app/machine-type/machine-type.html",
            controller: "MachineTypeCtrl",
            controllerAs : "vm"
        })

    }
}())