(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl' , DashboardCtrl);

    DashboardCtrl.$inject = [ 'dashboardService' , 'NgTableParams', '$filter' , 'USER_ROLE' , '$uibModal' , 'ngNotify' , '$state'];

    function DashboardCtrl( dashboardService , NgTableParams, $filter , USER_ROLE , $uibModal , ngNotify , $state) {
        var vm = this;
        vm.userList = [];

        activate();

        function activate() {
            dashboardService.getUserList().then(function (response) {
                if (response.status == 200) {
                    console.log(response)
                    vm.masterUserList = response.data.data;
                    for(var index=0 ; index<vm.masterUserList.length ; index++){
                        if(vm.masterUserList[index].role != USER_ROLE.ROLE_ADMIN)
                            vm.userList.push(vm.masterUserList[index])
                    }

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
