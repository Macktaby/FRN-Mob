angular.module('imageID.controllers').controller('VendorCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state) {
	$scope.data = {};
	
	var v = MemoryService.getData("vendor");
	if(v != null && $stateParams.id == v.id){
		$scope.data.vendor = v;
	} else {
		$scope.vendorPromise = Restangular.all('vendor/' + $stateParams.id).getList().then(function(posts) {
			$scope.data.vendor = posts[0];
		}).catch(function(err) {
			$scope.data.vendor = [];
		});
	}
	
	$scope.showroomsPromise = Restangular.all('vendor/' + $stateParams.id + "/showrooms").getList().then(function(posts) {
		$scope.data.showrooms = posts;
	}).catch(function(err) {
		$scope.data.showrooms = [];
	});
	
	$scope.goToLocation = function(s){
		window.open("http://www.google.com/maps/place/" + s.location.lat + "," + s.location.lng, '_system');
	}
	$scope.call = function(s){
		window.open("tel:" + s.phone, '_system');
	}
	$scope.email = function(s){
		window.open("mailto:" + s.email, '_system');
	}
	$scope.openShowroom = function(s){
		MemoryService.putData("showroom", s);
		$state.go("app.showroom", {"id" : s.id});
	}
});