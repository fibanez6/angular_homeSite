  'use strict';

  describe('myApp.node module', function() {

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

          beforeEach(module('myApp.node'));

          beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
              $httpBackend = _$httpBackend_;
              $httpBackend.expectGET('data/nodejs.json').
                  respond({
                      "id": "nodejs",
                      "name": "NodeJs",
                      "description": "Nodejs projects",
                      "imageUrl": "",
                      "websiteUrl": "",
                      "projects" : [
                          {
                              "id": "AlbumPhotos",
                              "name":"Album photos",
                              "description":"Album photos",
                              "imageUrl":"Album photos",
                              "websiteUrl":"http://nodejs.fibanez.com",
                              "version":"",
                              "created_date" :"",
                              "updated_date" :""
                          }
                      ]
                  });

              scope = $rootScope.$new();
              ctrl = $controller('NodeCtrl', {$scope: scope});
          }));

          it('should be defined /node', inject(function($controller) {
              //spec body
              expect(ctrl).toBeDefined();
          }));

          it('should create "node" model with 1 project', function() {
              expect(scope.data).toEqualData([]);
              $httpBackend.flush();
              expect(scope.data.projects.length).toBe(1);
          });

          it('should set the default value of orderProp model', function() {
              expect(scope.orderProp).toBe('created_date');
          });

      });
  });