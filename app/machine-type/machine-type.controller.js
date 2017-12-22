(function () {
    'use strict';

    angular.module('app')
        .controller('MachineTypeCtrl' , MachineTypeCtrl);

    MachineTypeCtrl.$inject = ['$stateParams', 'machineTypeService' , '$rootScope'];

    function MachineTypeCtrl($stateParams , machineTypeService , $rootScope) {
        var vm = this;
        activate();

        function activate() {
            vm.currentPage = $stateParams.id;
            vm.previousPage = $rootScope.previousId;

            machineTypeService.getData().then(function (response) {
                console.log(response)
                for(var index=0; index<response.data.length; index++){
                    if(vm.currentPage == response.data[index].name){
                        vm.machineTypeData = response.data[index];
                    }
                }
                console.log(vm.machineData)
            });
        }
    }
}());