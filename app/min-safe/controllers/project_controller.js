/**
 * Created by fibanez on 25/10/15.
 */

/**
 * Created by fibanez on 25/10/15.
 */
'use strict';

angular.module('myApp.project_details', ['ngRoute'])

    .controller('ProjectDetailsCtrl', ['$scope','$http',
        function($scope, $http, data) {
            console.log(data);
            $scope.data = data;
            $scope.orderProp = 'created_date';
        }]
);