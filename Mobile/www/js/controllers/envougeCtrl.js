angular.module('imageID.controllers').controller('EnvougeCtrl', function($scope, $timeout, $state, Restangular, MemoryService, $ionicSlideBoxDelegate, $cordovaSocialSharing) {
	$scope.data = {};
	$scope.title = "Envouge";
	
	$scope.data.envouge = MemoryService.getData("envouge");;
	$scope.title = $scope.data.envouge.post_title;
	
	$timeout(function() {
		$scope.$apply();
		$ionicSlideBoxDelegate.update();
	}, 100);
	
	$scope.pagerClick = function(index){
		$ionicSlideBoxDelegate.slide(index);
	}
	
	$scope.share = function(){
        $cordovaSocialSharing.share($scope.data.envouge.post_title, $scope.data.envouge.post_title, null, $scope.envouge.product.url);
	}
});