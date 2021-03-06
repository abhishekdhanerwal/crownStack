(function () {
  'use strict';

  angular
    .module('app')
    .factory('principal', principal);

  principal.$inject = ['$q', '$http', 'authFactory', 'ngNotify', '$localStorage' , '$rootScope' , '$state'];

  /* @ngInject */
  function principal($q, $http, authFactory, ngNotify, $localStorage , $rootScope ,$state) {

    var service = {
      signup:signup,
      signin: signin,
      signout: signout
    };
    return service;


    function isIdentityInLocalStorage() {
      return angular.isDefined($localStorage.__identity);
    }

    function clearLocalStorage() {
      if (isIdentityInLocalStorage()) {
        $localStorage.$reset();
        // delete $localStorage._identity;
        // delete $localStorage.loggedInTimeStamp;
      }
    }

    function signup(user) {
      var deferred = $q.defer();

      $http.post(__env.dataServerUrl+'/register', user)
          .then(
              function (response) {
                if (response.status == 200) {
                  // $localStorage.__identity.user = response.data.user;
                  // $localStorage.__identity.access_token = response.data.token;
                  $localStorage.loggedInTimeStamp = Date.now();
                  authFactory.setUserToken(response.data.token , response.data.user)
                  //_authenticated = true;
                  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;

                  console.log($localStorage.__identity)
                  deferred.resolve($localStorage.__identity);
                }
                else {
                  clearLocalStorage();
                  //_authenticated = false;
                  console.log(response)
                  deferred.reject("Invalid Login credentials");
                }
              },
              function (errors) {
                console.log(errors);
                clearLocalStorage();
                ngNotify.set(errors.data.message , 'error');
                //_authenticated = false;
                deferred.reject("Error connecting server " + errors);
              });
      return deferred.promise;

    }

    function signin(user) {
      var deferred = $q.defer();

      $http.post(__env.dataServerUrl+'/login', user)
          .then(
              function (response) {
                if (response.status == 200) {
                  // $localStorage.__identity.user = response.data.user;
                  // $localStorage.__identity.access_token = response.data.token;
                  $localStorage.loggedInTimeStamp = Date.now();
                  authFactory.setUserToken(response.data.token , response.data.user)
                  //_authenticated = true;
                  $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.__identity.token;

                  console.log($localStorage.__identity)
                  deferred.resolve($localStorage.__identity);
                }
                else {
                  clearLocalStorage();
                  //_authenticated = false;
                  deferred.reject("Invalid Login credentials");
                }
              },
              function (errors) {
                console.log(errors);
                clearLocalStorage();
                //_authenticated = false;
                deferred.reject("Error connecting server " + errors);
              });
      return deferred.promise;
    }

    function signout() {
      clearLocalStorage();
      $http.defaults.headers.common['Authorization'] = '';
      //_authenticated = false;
      return true;
    }
  }

})();


