(function () {
    'use strict';

    angular.module('app')
        .controller('LayoutCtrl' , LayoutCtrl);

    LayoutCtrl.$inject = ['navService'];

    function LayoutCtrl(navService) {
        var vm = this;

        activate();

        function activate() {

            navService.getData().then(function (response) {
                if(response.status ==200)
                 vm.nav = response.data.state;
            })
        }
    }
}());