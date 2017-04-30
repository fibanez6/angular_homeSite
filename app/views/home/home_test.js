/**
 * Created by fibanez on 10/10/15.
 */
'use strict';

describe('myApp.home module', function() {

    beforeEach(function(){
        jasmine.addMatchers({
            toEqualData: function(expected) {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });
    });

    describe('home controller', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(module('myApp.home'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/projects.json').
                respond({
                    "name": "fibanez",
                    "description": "Fibanez projects",
                    "imageUrl": "",
                    "websiteUrl": "",
                    "projects" : [
                        {
                            "name":"Angular",
                            "description":"Angular",
                            "imageUrl":"",
                            "websiteUrl":"#/angular"
                        },
                        {
                            "name":"NodeJs",
                            "description":"NodeJs",
                            "imageUrl":"",
                            "websiteUrl":"#/node"
                        },
                        {
                            "name":"Django",
                            "description":"Django",
                            "imageUrl":"",
                            "websiteUrl":"#/django"
                        },
                        {
                            "name":"Games",
                            "description":"Games",
                            "imageUrl":"",
                            "websiteUrl":"#/unity"
                        }
                    ]
                });

            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {$scope: scope});
        }));

        it('should be defined /', inject(function($controller) {
            //spec body
            expect(ctrl).toBeDefined();
        }));

        it('should create "home" model with 4 projects', function() {
            expect(scope.projects).toEqualData([]);
            $httpBackend.flush();
            expect(scope.projects.length).toBe(4);
        });

        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('name');
        });

    });
});