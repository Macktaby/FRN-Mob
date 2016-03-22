angular.module('imageID.controllers').controller('HomeCtrl', function($scope, $timeout, $state, $log, Restangular, MemoryService, $rootScope, $ionicSlideBoxDelegate) {
	$scope.data = {};
	$scope.data.ads = [];
	$scope.data.featured = [];
	
	$scope.adsPromise = Restangular.all('type/ad').getList().then(function(posts) {
        if(posts.length > 2){
            $scope.data.ads = [ posts[0], posts[1] ];
        } else {
            $scope.data.ads = posts;
        }
	}).catch(function(err) {
		$scope.data.ads = [];
	});
	
	$scope.featuredPromise = Restangular.all('homepage').getList().then(function(posts) {
		$scope.data.featured = posts;
        
        $timeout(function() {
        	$scope.$apply();
			$ionicSlideBoxDelegate.update();
    	}, 100);
	}).catch(function(err) {
		$scope.data.featured = [];
	});
	
	
	$scope.openDetails = function(v){
		// Promotable types:
		// 'designer', 'vendor', 'showroom', 'catalog', 'product', 'house'
		if(v.post_type == "designer") {
			MemoryService.putData("designer", v);
			$state.go("app.designer", { "id" : v.id });
		} else if(v.post_type == "vendor") {
			$state.go("app.vendor", { "id" : v.id });
		} else if (v.post_type == "showroom"){
			$state.go("app.showroom", { "id" : v.id });
		} else if (v.post_type == "catalog"){
			if(ionic.Platform.isAndroid()){
				window.open("https://docs.google.com/gview?embedded=true&url=" + v.file, '_blank', 'location=no');
			} else {
				window.open(v.file, '_blank', 'location=no');
			}
		} else if (v.post_type == "house"){
			MemoryService.putData("house", v);
			$state.go("app.house", { "id" : v.id });
		} else if (v.post_type == "product"){
			$state.go("app.product", { "id" : v.id });
		}
	}
	
	$scope.openAd = function(ad){
		window.open(ad.url, "_system");
	}
});