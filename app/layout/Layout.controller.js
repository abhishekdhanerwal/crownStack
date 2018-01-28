(function () {
    'use strict';

    angular.module('app')
        .controller('LayoutCtrl' , LayoutCtrl);

    LayoutCtrl.$inject = ['navService'];

    function LayoutCtrl(navService) {
        var vm = this;

        activate();

        function activate() {

        }
    }
}());