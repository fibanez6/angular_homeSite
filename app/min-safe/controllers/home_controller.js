/**
 * Created by fibanez on 10/10/15.
 */
'use strict';

var app = angular.module('myApp.home', ['ngRoute']);

//.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/', {
//        templateUrl: 'views/home/home_view.html',
//        controller: 'HomeCtrl'
//    });
//}])

app.controller('HomeCtrl', ['$scope', '$location', '$http',
        function($scope, $location, $http) {
            $scope.projects = [];
            $http.get('data/projects.json').success(function(data) {
                $scope.projects = data.projects;
            });
            $scope.orderProp = 'name';
            $scope.showHeader = true;
        }]
);