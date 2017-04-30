/**
 * Created by fibanez on 10/10/15.
 */
'use strict';

angular.module('myApp.angular', ['ngRoute'])

    .controller('AngularCtrl', ['$scope', '$http',
        function($scope, $http) {
            $scope.data = [];
            $http.get('data/angularjs.json').success(function(data) {
                $scope.data = data;
            });
            $scope.orderProp = 'created_date';
        }]
);