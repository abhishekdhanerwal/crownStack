(function () {
    'use strict';

    angular.module('app')
        .controller('MachineCtrl' , MachineCtrl);

    MachineCtrl.$inject = ['$stateParams', 'machineService' ,'$rootScope'];

    function MachineCtrl($stateParams , machineService , $rootScope) {
        var vm = this;

        activate();

        function activate() {
            machineService.getData().then(function (response) {
                console.log(response)
                for(var index=0; index<response.data.length; index++){
                    if($stateParams.id == response.data[index].id){
                        vm.machineData = response.data[index];
                    }
                }
                console.log(vm.machineData)
            });

            $rootScope.previousId = $stateParams.id;
        }
    }
}());