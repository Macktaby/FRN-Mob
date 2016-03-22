angular.module('imageID.controllers').controller('HouseCtrl', function($scope, $timeout, $state, Restangular, MemoryService, $ionicSlideBoxDelegate, $cordovaSocialSharing) {
	$scope.data = {};
	$scope.title = "House";
	
	$scope.data.house = MemoryService.getData("house");
	$scope.title = $scope.data.house.post_title;
	
	$timeout(function() {
		$scope.$apply();
		$ionicSlideBoxDelegate.update();
	}, 100);
	
	$scope.pagerClick = function(index){
		$ionicSlideBoxDelegate.slide(index);
	}
	
	$scope.share = function(){
        $cordovaSocialSharing.share($scope.data.house.post_title, $scope.data.house.post_title, null, $scope.data.house.url);
	}
});