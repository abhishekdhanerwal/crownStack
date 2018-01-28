(function () {
    'use strict';

    angular.module('app')
        .controller('UsersCtrl' , UsersCtrl);

    UsersCtrl.$inject = [ 'userService' , 'NgTableParams', '$filter' , 'USER_ROLE' , '$uibModal' , 'ngNotify' , '$state'];

    function UsersCtrl( userService , NgTableParams, $filter , USER_ROLE , $uibModal , ngNotify , $state) {
        var vm = this;
        vm.userList = [];

        activate();

        function activate() {
            userService.getUserList().then(function (response) {
                if (response.status == 200) {
                    console.log(response)
                    vm.masterUserList = response.data.data;
                    for(var index=0 ; index<vm.masterUserList.length ; index++){
                        if(vm.masterUserList[index].role != USER_ROLE.ROLE_ADMIN)
                            vm.userList.push(vm.masterUserList[index])
                    }
                    listView();
                    ngNotify.set('User list generated');
                }
                else if (response.status == -1) {
                    vm.progress = false;
                    vm.errorMessage = 'Network Error';
                    ngNotify.set('Network Error', 'error');
                }
                else if (response.status == 400) {
                    vm.progress = false;
                    vm.errorMessage = response.data.message;
                    ngNotify.set(response.data.message, 'error');
                }
                else if (response.status == 401) {
                    vm.progress = false;
                    ngNotify.set("User is not logged in.Login Again", 'error');
                    $state.go('auth.logout')
                }
                else {
                    vm.progress = false;
                    ngNotify.set('Some problem', 'error');
                }
            });
        }

        function listView(){
            vm.tableParams = new NgTableParams(
                {
                    page: 1, // show first page
                    count: 5, // count per page
                    sorting: {
                        lastModified: 'desc' // initial sorting
                    }, // count per page
                    filter: {
                        name: '' // initial filter
                    }
                },
                {
                    getData: function (params) {
                        if (vm.userList != null) {
                            console.log(vm.userList)
                            vm.progress = false;
                            var random = (new Date()).toString();
                            for (var index = 0; index < vm.userList.length; index++) {
                                vm.userList[index].logoUrl = vm.userList[index].logoUrl + "?cb=" + random;
                            }
                            var filteredData = null;
                            var orderedData = null;
                            if (params != null) {
                                if (params.filter()) {
                                    filteredData = $filter('filter')(vm.userList, params.filter())
                                    console.log(filteredData)
                                }
                                else {
                                    filteredData = vm.userList;
                                }
                                if (params.sorting()) {
                                    orderedData = $filter('orderBy')(filteredData, params.orderBy());
                                }
                                else {
                                    orderedData = filteredData;
                                }

                                params.total(orderedData.length);
                                var returnData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
                                return returnData;
                            }
                            else {
                                return vm.userList;

                            }
                        }
                    }
                }

            )};

        vm.openModal = function (row) {
            var modalInstance = $uibModal.open({
                templateUrl: 'addPoints.html',
                controller: 'addPointsCtrl',
                resolve: {
                    items: function () {
                        return row;
                    }
                }
            });

            modalInstance.result.then(function (updateduser) {
                userService.updateuser(updateduser._id , updateduser).then(function (response) {
                    if (response.status == 200) {
                        ngNotify.set('User updated');
                    }
                    else if (response.status == -1) {
                        vm.progress = false;
                        vm.errorMessage = 'Network Error';
                        ngNotify.set('Network Error', 'error');
                    }
                    else if (response.status == 400) {
                        vm.progress = false;
                        vm.errorMessage = response.data.message;
                        ngNotify.set(response.data.message, 'error');
                    }
                    else if (response.status == 401) {
                        vm.progress = false;
                        ngNotify.set("User is not logged in.Login Again", 'error');
                        $state.go('auth.logout')
                    }
                    else {
                        vm.progress = false;
                        ngNotify.set('Some problem', 'error');
                    }
                    $state.reload();
                })
            });

        };
    }
}());

(function () {
    'use strict';

    angular
        .module('app')
        .controller('addPointsCtrl', addPointsCtrl);

    addPointsCtrl.$inject = ["$scope", "$uibModalInstance" , "items" , "$log" , "$filter"];
    /* @ngInject */
    function addPointsCtrl($scope, $uibModalInstance, items  ,  $log , $filter) {

        $scope.user = items;

        $scope.ok = function () {
            $scope.user.points = $scope.user.points + $scope.addedPoints;
            $uibModalInstance.close($scope.user);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
