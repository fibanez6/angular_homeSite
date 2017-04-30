/**
 * Created by fibanez on 10/10/15.
 */

'use strict';

describe('myApp.unity module', function() {

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

        beforeEach(module('myApp.unity'));

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('data/games.json').
                respond({
                    "id": "unity",
                    "name": "Unity",
                    "description": "Unity 3D games",
                    "imageUrl": "",
                    "websiteUrl": "",
                    "projects" : [
                        {
                            "id": "roll_a_ball",
                            "name": "Roll a ball",
                            "description": "Roll a ball",
                            "imageUrl": "",
                            "websiteUrl": "http://fibanez.com:8000/Roll_a_ball_html5/index.html",
                            "version":"",
                            "created_date" :"",
                            "updated_date" :""
                        }
                    ]
                });

            scope = $rootScope.$new();
            ctrl = $controller('UnityCtrl', {$scope: scope});
        }));

        it('should be defined /unity', inject(function($controller) {
            //spec body
            expect(ctrl).toBeDefined();
        }));

        it('should create "unity" model with 1 project', function() {
            expect(scope.data).toEqualData([]);
            $httpBackend.flush();
            expect(scope.data.projects.length).toBe(1);
        });

        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('created_date');
        });

    });
});