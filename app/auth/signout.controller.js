(function() {
    'use strict';

    angular
        .module('auth')
        .controller('SignoutController', SignoutController);

    SignoutController.$inject = ['$state', 'principal' , '$localStorage' , '$window'];
    /* @ngInject */
    function SignoutController($state, principal , $localStorage , $window) {
        var vm = this;

        activate();

        function activate() {
            if(principal.signout()){

                $state.go('auth.login');
            };

        }

    }
})();

