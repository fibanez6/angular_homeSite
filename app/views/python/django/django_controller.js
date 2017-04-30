'use strict';

angular.module('myApp.django', ['ngRoute'])

//.config(['$routeProvider', function($routeProvider) {
//  $routeProvider.when('/django', {
//    templateUrl: 'views/python/django/django_view.html',
//    controller: 'DjangoCtrl'
//  });
//}])

.controller('DjangoCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.data = [];
        $http.get('data/python.json').success(function(data) {
            $scope.data = data;
        });
        $scope.orderProp = 'created_date';
    }]
);