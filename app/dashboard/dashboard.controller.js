(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl' , DashboardCtrl);

    DashboardCtrl.$inject = [ 'dashboardService' , 'NgTableParams', '$filter' , 'USER_ROLE' , 'ngNotify' , '$state'];

    function DashboardCtrl( dashboardService , NgTableParams, $filter , USER_ROLE  , ngNotify , $state) {
        var vm = this;

        activate();

        function activate() {
            dashboardService.getQuestions().then(function (response) {
                vm.questions = response.data.data.question;
            })
        }

        vm.updateQuestion = function(time , question){
            dashboardService.updateQuestion(time , question).then(function (response) {
                console.log(response)
            })
        }
    }
}());