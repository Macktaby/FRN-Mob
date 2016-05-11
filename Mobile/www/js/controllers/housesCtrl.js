angular.module('imageID.controllers').controller('HousesCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.houses = [];
	
	$scope.$on("$ionicView.enter", function(event, data){
		$('input').blur();
	});
	
	$scope.housesPromise = Restangular.all('type/house').getList().then(function(posts) {
		$scope.data.houses = posts;
	}).catch(function(err) {
		$scope.data.houses = [];
	});
	
	$scope.goToDetails = function(v){
		MemoryService.putData("house", v);
		$state.go("app.house", { "id" : v.id });
	}
});