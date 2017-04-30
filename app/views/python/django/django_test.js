'use strict';

describe('myApp.django module', function() {

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

        beforeEach(module('myApp.django'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/python.json').
                respond({
                    "id": "django",
                    "name": "Django",
                    "description": "Django projects",
                    "imageUrl": "",
                    "websiteUrl": "",
                    "projects" : [
                        {
                            "id": "blog",
                            "name":"Blog",
                            "description":"Blog",
                            "imageUrl":"",
                            "websiteUrl":"http://blog.fibanez.com",
                            "version":"",
                            "created_date" :"",
                            "updated_date" :""
                        }
                    ]
                });

            scope = $rootScope.$new();
            ctrl = $controller('DjangoCtrl', {$scope: scope});
        }));

        it('should be defined /django', inject(function($controller) {
            //spec body
            expect(ctrl).toBeDefined();
        }));

        it('should create "django" model with 1 project', function() {
            expect(scope.data).toEqualData([]);
            $httpBackend.flush();
            expect(scope.data.projects.length).toBe(1);
        });

        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('created_date');
        });

    });
});