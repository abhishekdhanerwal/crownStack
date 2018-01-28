
(function () {
  'use strict';

  angular
    .module('app')
    .factory('authFactory', authFactory);

  authFactory.$inject = ['$localStorage' , 'ngNotify' ,'$state'];

  function authFactory($localStorage , ngNotify ,$state) {
    var service = {};

    service.setUserToken = function (token , user) {
      // console.log($localStorage)
      $localStorage.__identity = {};
      $localStorage.__identity.user = user;
      $localStorage.__identity.token = token;
    }

    service.getUserToken = function () {
      if($localStorage.__identity != undefined)
        return $localStorage.__identity.token;
    }

    service.isAuthenticated = function () {
      if(!!this.getUserToken())
      return !!this.getUserToken();
      else {
        ngNotify.set("User is not logged in. Redirecting to Login Page" , 'error');
        $state.go('auth.login');
      }
    };

    return service;
  };

}());
