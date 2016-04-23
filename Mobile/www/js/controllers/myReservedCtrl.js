angular.module('imageID.controllers').controller('MyReservedCtrl', function($scope, $timeout, $state, AuthService, Restangular, WORDPRESS_REST_BASE_URL, $http, $ionicLoading) {
	$scope.data = {};
	$scope.data.user = AuthService.getUser().data;
	console.log("rewrew");
	
	$ionicLoading.show({
      template: 'Loading...'
    });
	$http.get(WORDPRESS_REST_BASE_URL + '/user/' + $scope.data.user.id + '/profile').then(function(posts) {
		$scope.data.fav_products = posts.data.liked;
		$scope.data.res_products = posts.data.reserved;
		
		$timeout(function(){
			$scope.$apply();
		});
		$ionicLoading.hide();
	}).catch(function(err) {
		$scope.data.fav_products = [];
		$scope.data.res_products = [];
		$ionicLoading.hide();
	});
	
	$scope.openProduct = function(p){
		$state.go("app.product", { "id" : p.id });
	}
});