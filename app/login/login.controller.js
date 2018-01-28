(function () {
    'use strict';

    angular.module('auth')
        .controller('LoginCtrl' , LoginCtrl);

    LoginCtrl.$inject = ['$state', 'ngNotify' , 'principal', 'USER_ROLE'];

    function LoginCtrl($state, ngNotify , principal, USER_ROLE) {
        var vm = this;

        activate();
        function activate() {

        }

        vm.login = function () {
            principal.signin(vm.user).then(function (userInfo) {
                if(userInfo.user.role == USER_ROLE.ROLE_ADMIN){
                    $state.go('app.dashboard');
                }
                else
                ngNotify.set('You are not admin!', 'error');

            }, function () {

                ngNotify.set("Please enter valid credentials" , 'error');

            });
            //
            // console.log('ads')
            // $state.go('app.dashboard')
        }
    }
}());