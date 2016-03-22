angular.module('imageID.controllers').controller('VendorsCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.vendors = [];
	
	$scope.vendorsPromise = Restangular.all('vendor').getList().then(function(posts) {
		$scope.data.vendors = posts;
	}).catch(function(err) {
		$scope.data.vendors = [];
	});
	
	$scope.goToDetails = function(v){
		MemoryService.putData("vendor", v);
		$state.go("app.vendor", { "id" : v.id });
	}
});