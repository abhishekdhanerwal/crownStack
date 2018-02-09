(function () {
    'use strict';

    angular.module('app')
        .config(routerConfig);

    routerConfig.$inject = ['$stateProvider' , '$urlRouterProvider'];

    function routerConfig($stateProvider , $urlRouterProvider) {

        // $urlRouterProvider.otherwise("/app/dashboard");

        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            resolve:{
                authorize: ['authFactory',
                    function(authFactory) {
                        return authFactory.isAuthenticated();
                    }
                ]
            },
            templateUrl: "app/layout/layout.html",
            controller: "LayoutCtrl",
            controllerAs: "vm"

        }).state('app.dashboard', {
            url: "/dashboard",
            templateUrl: "app/dashboard/dashboard.html",
            controller: "DashboardCtrl",
            controllerAs: "vm"
        }).state('app.users', {
            url: "/users",
            templateUrl: "app/user-management/user-management.html",
            controller: "UsersCtrl",
            controllerAs: "vm"
        })

        $stateProvider.state('auth', {
            url: "/auth",
            abstract: true,
            template: '<div ui-view class="fade-in-right-big smooth"></div>'
        }).state('auth.login', {
            url: "/login",
            templateUrl: "app/login/login.html",
            controller:"LoginCtrl",
            controllerAs: "vm"
        }).state('auth.privacy', {
            url: "/privacy",
            templateUrl: "app/auth/privacy.html"
        }).state('auth.logout', {
            url: "/logout",
            controller:"SignoutController",
            controllerAs: "vm"
        })
    }

}())