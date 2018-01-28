var app = angular.module('app' , [
    'auth',
    'ui.router',
    'angularBootstrapNavTree',
    'ngTable',
    'ngLetterAvatar',
    'ngNotify',
    'ui.bootstrap',
    'ngStorage'
]);

(function () {
    'use strict';

    angular.module('app')
        .run(runApp);

    runApp.$inject = ['$state' , '$localStorage', '$http'];

    function runApp($state , $localStorage , $http) {
        if($localStorage.__identity != undefined && $localStorage.__identity.token)
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;
        $state.transitionTo('auth.login');
    }
}())