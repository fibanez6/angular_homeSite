/**
 * Created by fibanez on 11/10/15.
 */
'use strict';

describe('myApp.angular module', function() {

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

    describe('django controller', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(module('myApp.angular'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/angularjs.json').
                respond({
                    "id": "angular",
                    "name": "Angular",
                    "description": "Angular projects",
                    "imageUrl": "",
                    "websiteUrl": "",
                    "projects" : [
                        {
                            "id": "cover",
                            "name":"Home Page",
                            "description":"Home page",
                            "imageUrl":"",
                            "websiteUrl":"",
                            "version":"",
                            "created_date" :"",
                            "updated_date" :""
                        }
                    ]
                });

            scope = $rootScope.$new();
            ctrl = $controller('AngularCtrl', {$scope: scope});
        }));

        it('should be defined /angular', inject(function($controller) {
            //spec body
            expect(ctrl).toBeDefined();
        }));

        it('should create "angular" model with 1 project', function() {
            expect(scope.data).toEqualData([]);
            $httpBackend.flush();
            expect(scope.data.projects.length).toBe(1);
        });

        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('created_date');
        });

    });
});