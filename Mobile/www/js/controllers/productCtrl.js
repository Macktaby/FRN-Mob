angular.module('imageID.controllers').controller('ProductCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state, $ionicSlideBoxDelegate, $cordovaSocialSharing, $http, WORDPRESS_REST_BASE_URL, AuthService, $ionicLoading) {
	$scope.data = {};
	
	$scope.ratingsObject = {
		iconOn : 'ion-ios-star',
		iconOff : 'ion-ios-star-outline',
		iconOnColor: 'rgb(200, 200, 100)',
		iconOffColor:  'rgb(200, 100, 100)',
		rating:0,
		minRating:1,
        callback: function(rating) {
          console.log('Selected rating is : ', rating);
			var userID = AuthService.getUser().data.id;
			$http.get(WORDPRESS_REST_BASE_URL + '/user/' + userID + "/rate/" + $scope.data.product.id + "/" + rating).then(function(posts) {
				console.log("Favoriate saved");
			}).catch(function(err) {
				console.log("Favoriate saving error");
			});
        }
	};
	
	for(var i = 0; i < $scope.rates.length; i++){
		if($scope.rates[i].post_id == $stateParams.id){
			$scope.ratingsObject.rating = $scope.rates[i].rating;
		}
	}
	
	$scope.isProductReserved = $scope.reserved.indexOf($stateParams.id) > -1;
	
	$scope.productPromise = Restangular.all("type/product/" + $stateParams.id).getList().then(function(posts) {
		$scope.data.product = posts[0];
		
		$timeout(function() {
        	$scope.$apply();
			$ionicSlideBoxDelegate.update();
    	}, 100);
	}).catch(function(err) {
		$scope.data.product = {};
	});
	
	$scope.pagerClick = function(index){
		$ionicSlideBoxDelegate.slide(index);
	}
	
	$scope.share = function(){
        $cordovaSocialSharing.share($scope.data.product.post_title, $scope.data.product.post_title, null, $scope.data.product.url);
	}
	
	$scope.reserve = function(){
		$ionicLoading.show({
			template: 'Loading...'
		});
		var userID = AuthService.getUser().data.id;
		$http.get(WORDPRESS_REST_BASE_URL + '/user/' + userID + "/reserve/" + $scope.data.product.id).then(function(posts) {
			console.log("Favoriate saved");
			$ionicLoading.hide();
		}).catch(function(err) {
			console.log("Favoriate saving error");
			$ionicLoading.hide();
		});
	}
});