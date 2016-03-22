angular.module('imageID.directives')
.directive('iidFavorite', function (AuthService, $http, WORDPRESS_REST_BASE_URL, $rootScope) {
    return {
        restrict: 'E',
        template: '<div class="favourite-icon" ng-click="doFav(); $event.preventDefault(); $event.stopPropagation();"><i ng-class="{\'ion-ios-heart-outline\': !favorited, \'ion-ios-heart\': favorited}"></i></div>',
        scope: {
            itemId : "@"
        },
        link: function (scope, element, attrs) {
            if(scope.$root.favorties){
                scope.favorited = scope.$root.favorties.indexOf(scope.itemId) > -1;
            }
            scope.$watch('itemId', function(newVal, oldVal){
                if(scope.$root.favorties){
                    scope.favorited = scope.$root.favorties.indexOf(scope.itemId) > -1;
                }
            }, true);
            scope.doFav = function(){
                if(scope.favorited){
                    scope.$root.favorties.splice(scope.$root.favorties.indexOf(scope.itemId));
                    scope.favorited = false;
                } else {
                    scope.$root.favorties.push(scope.itemId);
                    scope.favorited = true;
                }
                
                localStorage.setItem("favorties", JSON.stringify({
                    "favorties" : scope.$root.favorties
                }));
                
                var userID = AuthService.getUser().data.id;
                var action = scope.favorited ? "like" : "unlike"
                $http.get(WORDPRESS_REST_BASE_URL + '/user/' + userID + "/" + action + "/" + scope.itemId).then(function(posts) {
                    console.log("Favoriate saved");
                }).catch(function(err) {
                    console.log("Favoriate saving error");
                });
            }
            
            
            scope.$on("profileUpdated", function (event, args) {
                //console.log("Got broadcast");
                if(scope.$root.favorties){
                    scope.favorited = scope.$root.favorties.indexOf(scope.itemId) > -1;
                    //console.log("Set favoorited to " + scope.favorited + " for item " + scope.itemId);
                }
            });
            //console.log("Item ID: " + scope.itemId);
        }
    };
})