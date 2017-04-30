'use strict';

var feederControllers = angular.module('myApp.feeder', ['ngRoute']);

feederControllers.controller('FeederCtrl', ['$scope', '$http',
    function($scope, $http) {

        function feedPostRender(element) {
            $(element).find('a').attr('target', '_blank');
        }

    }]
);