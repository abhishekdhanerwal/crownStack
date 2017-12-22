var app = angular.module('app' , [
    'ui.router',
    'angularBootstrapNavTree',
    'ngLetterAvatar'
]);

(function () {
    'use strict';

    angular.module('app')
        .run(runApp);

    runApp.$inject = ['$state'];

    function runApp($state) {

        $state.transitionTo('app.welcome');
    }
}())