/**
 * @author Diego
 */

(function (angular, undefined) {
    "use strict";

    var app = angular.module('TestApp', ['dv.srcset']);

    app.controller("TestController", TestController);

    TestController.$inject = ['$scope'];

    function TestController($scope) {

        window.$s = $scope;

    }

})(angular);
