/**
 * Created by fibanez on 10/10/15.
 */
'use strict';

angular.module('myApp.unity', ['ngRoute'])

.controller('UnityCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.data = [];
        $http.get('data/games.json').success(function(data) {
            $scope.data = data;
        });
        $scope.orderProp = 'created_date';
    }]
);