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
    'myApp.feeder',
    'myApp.version',
    'feeds',
    'ngStickyFooter'
]);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "viewHeader": { templateUrl: 'views/partials/cover.html'},
                "viewContainer": {
                    templateUrl: 'views/home/home_view.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('node', {
            url: "/node",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/project/project_list_view.html',
                    controller: 'NodeCtrl'
                }
            }
        })
        .state('angular', {
            url: "/angular",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/project/project_list_view.html',
                    controller: 'AngularCtrl'
                }
            }
        })
        .state('django', {
            url: "/django",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/project/project_list_view.html',
                    controller: 'DjangoCtrl'
                }
            }
        })
        .state('unity', {
            url: "/unity",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/project/project_list_view.html',
                    controller: 'UnityCtrl'
                }
            }
        })
        .state('details', {
            url: "/:project/:id/details",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/project/project_details_view.html',
                    controller: 'UnityCtrl'
                }
            }
        })
        .state('about', {
            url: "/about",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/about/about_view.html'
                }
            }
        })
        .state('feeder', {
            url: "/feeder",
            views: {
                "viewHeader": { templateUrl: 'views/partials/nav.html' },
                "viewContainer": {
                    templateUrl: 'views/feeder/feeder_view.html',
                    controller: 'FeederCtrl'
                }
            }
        })
        ;
}]);

myApp.controller("LocationController", ['$scope', '$location', function($scope, $location) {
    $scope.$location = {};
    angular.forEach("protocol host port path search hash".split(" "), function(method){
        $scope.$location[method] = function(){
            var result = $location[method].call($location);
            return angular.isObject(result) ? angular.toJson(result) : result;
        };
    });
}]);

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

myApp.directive('resize', ['$window', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    'width': (newValue.w - 100) + 'px'
                };
            };

            scope.logo_inline = (newValue.w < 1000) ? "logo-inline" : "voffset-5";

        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    }
}]);

myApp.directive('comment', function () {
    return {
        restrict: 'E',
        compile: function (tElement, attrs) {
            tElement.remove();
        }
    };
});