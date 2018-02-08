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

            userService.getCompletedPayment().then(function (response) {
                if (response.status == 200) {
                    vm.completedpayment = response.data.data;
                    for(var index=0 ; index<vm.completedpayment.length ; index++){
                        vm.completedpayment[index].name = vm.completedpayment[index].userId.name;
                        vm.completedpayment[index].mobile = vm.completedpayment[index].userId.mobile;
                        vm.completedpayment[index].points = vm.completedpayment[index].userId.points;
                    }
                    console.log(vm.completedpayment)
                    listViewCompletedPayment();
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
            })

            userService.getBankRequest().then(function (response) {
                if (response.status == 200) {
                    vm.bankUsers = response.data.data;
                    for(var index=0 ; index<vm.bankUsers.length ; index++){
                        vm.bankUsers[index].name = vm.bankUsers[index].userId.name;
                        vm.bankUsers[index].mobile = vm.bankUsers[index].userId.mobile;
                        vm.bankUsers[index].points = vm.bankUsers[index].userId.points;
                    }
                    console.log(vm.bankUsers)
                    listViewBank();
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
            })

            userService.getPaytmRequest().then(function (response) {
                if (response.status == 200) {
                    vm.paytmUsers = response.data.data;
                    for(var index=0 ; index<vm.paytmUsers.length ; index++){
                        vm.paytmUsers[index].name = vm.paytmUsers[index].userId.name;
                        vm.paytmUsers[index].mobile = vm.paytmUsers[index].userId.mobile;
                        vm.paytmUsers[index].points = vm.paytmUsers[index].userId.points;
                    }
                    console.log(vm.paytmUsers)
                    listViewPaytm();
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
            })
        }

        function listViewCompletedPayment(){
            vm.tableParamsCompleted = new NgTableParams(
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
                        if (vm.completedpayment != null) {
                            console.log(vm.completedpayment)
                            vm.progress = false;
                            var random = (new Date()).toString();
                            for (var index = 0; index < vm.completedpayment.length; index++) {
                                vm.completedpayment[index].logoUrl = vm.completedpayment[index].logoUrl + "?cb=" + random;
                            }
                            var filteredData = null;
                            var orderedData = null;
                            if (params != null) {
                                if (params.filter()) {
                                    filteredData = $filter('filter')(vm.completedpayment, params.filter())
                                    console.log(filteredData)
                                }
                                else {
                                    filteredData = vm.completedpayment;
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
                                return vm.completedpayment;

                            }
                        }
                    }
                }

            )};

        function listViewBank(){
            vm.tableParamsBank = new NgTableParams(
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
                        if (vm.bankUsers != null) {
                            console.log(vm.bankUsers)
                            vm.progress = false;
                            var random = (new Date()).toString();
                            for (var index = 0; index < vm.bankUsers.length; index++) {
                                vm.bankUsers[index].logoUrl = vm.bankUsers[index].logoUrl + "?cb=" + random;
                            }
                            var filteredData = null;
                            var orderedData = null;
                            if (params != null) {
                                if (params.filter()) {
                                    filteredData = $filter('filter')(vm.bankUsers, params.filter())
                                    console.log(filteredData)
                                }
                                else {
                                    filteredData = vm.bankUsers;
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
                                return vm.bankUsers;

                            }
                        }
                    }
                }

            )};

        function listViewPaytm(){
            vm.tableParamsPaytm = new NgTableParams(
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
                        if (vm.paytmUsers != null) {
                            console.log(vm.paytmUsers)
                            vm.progress = false;
                            var random = (new Date()).toString();
                            for (var index = 0; index < vm.paytmUsers.length; index++) {
                                vm.paytmUsers[index].logoUrl = vm.paytmUsers[index].logoUrl + "?cb=" + random;
                            }
                            var filteredData = null;
                            var orderedData = null;
                            if (params != null) {
                                if (params.filter()) {
                                    filteredData = $filter('filter')(vm.paytmUsers, params.filter())
                                    console.log(filteredData)
                                }
                                else {
                                    filteredData = vm.paytmUsers;
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
                                return vm.paytmUsers;

                            }
                        }
                    }
                }

            )};

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

        vm.openPaytmModal = function (row) {
            var modalInstance = $uibModal.open({
                templateUrl: 'addPoints.html',
                controller: 'addPaytmPointsCtrl',
                resolve: {
                    items: function () {
                        return row;
                    }
                }
            });

            modalInstance.result.then(function (updateduser) {
                console.log(updateduser)
                userService.updatePayment(updateduser._id , updateduser).then(function (response) {
                    if (response.status == 200) {
                        ngNotify.set('Payment updated');
                        $state.reload();
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
        $scope.disableButton = false;

        $scope.ok = function () {
            $scope.user.points = $scope.user.points + $scope.addedPoints;
            $uibModalInstance.close($scope.user);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .controller('addPaytmPointsCtrl', addPaytmPointsCtrl);

    addPaytmPointsCtrl.$inject = ["$scope", "$uibModalInstance" , "items" , "$log" , "$filter"];
    /* @ngInject */
    function addPaytmPointsCtrl($scope, $uibModalInstance, items  ,  $log , $filter) {

        $scope.user = items;
        $scope.disableButton = true;
        $scope.addedPoints = Math.floor($scope.user.amount);

        $scope.ok = function () {
            $scope.user.points = $scope.user.points - $scope.addedPoints;
            $uibModalInstance.close($scope.user);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
