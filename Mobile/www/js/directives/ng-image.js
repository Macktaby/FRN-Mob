angular.module('imageID.directives', [])
.directive('ngImage', function () {
    return {
        restrict: 'E',
        template: '<img src="{{source}}" />',
        scope: {
            source : "@"
        },
        replace: true,
        transclude: false,
        link: function (scope, element, attrs) {
            if(!scope.source) {
                scope.source = "img/loading.png";
            }
            element.bind('error', function() {
                angular.element(this).attr("src", "img/loading.png");
                console.log("Error loading image: " + scope.source);
            });
        }
    };
})