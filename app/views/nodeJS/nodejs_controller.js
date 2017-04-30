'use strict';

var nodeControllers = angular.module('myApp.node', ['ngRoute']);

//nodeControllers.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.when('/node', {
//    templateUrl: 'views/node/nodejs_view.html',
//    controller: 'NodeCtrl'
//  });
//}]);

nodeControllers.controller('NodeCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.data = [];
        $http.get('data/nodejs.json').success(function(data) {
            $scope.data = data;
        });
        $scope.orderProp = 'created_date';
    }]
);