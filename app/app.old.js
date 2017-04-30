'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    //'ngRoute',
    'ui.router',
    'duScroll',
    'myApp.home',
    'myApp.angular',
    'myApp.node',
    'myApp.django',
    'myApp.unity',
    'myApp.version'
]);

myApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: 'views/home/home_view.html',
            controller: 'HomeCtrl'
        })
        .state('node', {
            url: "/node",
            templateUrl: 'views/nodeJS/nodejs_view.html',
            controller: 'NodeCtrl'
        })
        .state('angular', {
            url: "/angular",
            templateUrl: 'views/angularJS/angularjs_view.html',
            controller: 'AngularCtrl'
        })
        .state('django', {
            url: "/django",
            templateUrl: 'views/python/django/django_view.html',
            controller: 'DjangoCtrl'
        })
        .state('unity', {
            url: "/unity",
            templateUrl: 'views/games/unity/unity_view.html',
            controller: 'UnityCtrl'
        });
});

myApp.controller("LocationController", function($scope, $location) {
    $scope.$location = {};
    angular.forEach("protocol host port path search hash".split(" "), function(method){
        $scope.$location[method] = function(){
            var result = $location[method].call($location);
            return angular.isObject(result) ? angular.toJson(result) : result;
        };
    });
});


myApp.controller('ScrollController', ['$scope', '$location', '$document',
    function ($scope, $location, $document) {
        var top = 0;
        var offset = 0;
        var duration = 2000;

        $document.scrollTopAnimated(top).then(function() {
            console && console.log('You just scrolled to the top!');
        });

        $scope.gotoElement = function (eID){
            console && console.log("goto"+ eID);
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('view');

            var someElement = angular.element(document.getElementById(eID));
            $document.scrollToElement(someElement, offset, duration);

        };
    }
]);
