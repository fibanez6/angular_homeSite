(function() {
    'use strict';

    angular.module( 'ngStickyFooter', [] )

        .directive( "ngStickyFooter", [ '$window',
            function( $window ) {
                return {
                    restrict: 'A',
                    scope: true,
                    link: function(scope, element, attrs) {
                        // Get the heights
                        scope.heights = function() {
                            return {
                                window: $window.innerHeight,
                                elt: element[0].offsetHeight,
                                eltSetTop: element[0].offsetTop,
                                eltScrollTop: element[0].scrollTop,
                                eltClientTop: element[0].clientTop,
                                pageYOffset: $window.pageYOffset
                            };
                        };

                        // Set the offset. It is optional. Generally leave it blank.
                        var offset = attrs.offset || 0;

                        // Relocate the footer.
                        var setFooter = function() {
                            //console.log("scope.windowHeight="+scope.windowHeight);
                            //console.log("scope.eltHeight="+scope.eltHeight);
                            //console.log("scope.pageYOffsetHeight="+scope.pageYOffsetHeight);
                            //console.log("scope.eltSetTop="+scope.eltSetTop);
                            //console.log("scope.eltScrollTop="+scope.eltScrollTop);
                            //console.log("scope.eltClientTop="+scope.eltClientTop);

                            if (scope.windowHeight > scope.eltHeight + offset && scope.pageYOffsetHeight <= 0
                                && (!attrs.ngStickyFooter || scope.$eval(attrs.ngStickyFooter))
                                && scope.eltSetTop < scope.windowHeight ){
                                scope.footer = {
                                    position: 'absolute',
                                    bottom: 0
                                };
                            } else {
                                scope.footer = {};
                            }
                        };

                        // Watch the heights
                        scope.$watch(scope.heights, function(newValue, oldValue) {
                            scope.windowHeight = newValue.window;
                            scope.eltHeight = newValue.elt;
                            scope.pageYOffsetHeight = newValue.pageYOffset;
                            scope.eltSetTop = newValue.eltSetTop;
                            scope.eltScrollTop = newValue.eltScrollTop;
                            scope.eltClientTop = newValue.eltClientTop;
                            setFooter();
                        }, true);

                        // Add the listener
                        angular.element($window).bind('scroll', 'resize', function() {
                            scope.$apply();
                        });
                    }
                };
            }] )
}());