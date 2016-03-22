angular.module('imageID.controllers').controller('DesignerCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state, $ionicSlideBoxDelegate, AuthService, $http, $ionicLoading, $ionicPopup, WORDPRESS_REST_BASE_URL) {
	$scope.data = {};
	$scope.title = "Designer";
	
	$scope.data.designer  = MemoryService.getData("designer");
	$scope.title = $scope.data.designer.post_title;
	
	$timeout(function() {
		$scope.$apply();
		$ionicSlideBoxDelegate.update();
	}, 100);
	
	$scope.callPhone = function(){
		window.open("tel:" + $scope.data.designer.phone, '_system');
	}
	
	$scope.sendEmail = function(){
		// $scope.data.designer.email
	}
	
	$scope.goToWebsite = function(){
		window.open($scope.data.designer.website, '_system');
	}
	
	$scope.pagerClick = function(index){
		$ionicSlideBoxDelegate.slide(index);
	}
	
	$scope.contact = function(){
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="data.message">',
			title: 'Contact Designer',
			subTitle: 'Please enter your message',
			scope: $scope,
			buttons: [
			{ text: 'Cancel' },
			{
				text: '<b>Send</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.data.message) {
						e.preventDefault();
					} else {
						return $scope.data.message;
					}
				}
			}
			]
		});
		myPopup.then(function(res) {
			if(res != null){
				$ionicLoading.show({
					template: 'Loading...'
				});
				$http.post(WORDPRESS_REST_BASE_URL + '/do/communications', $.param({
					"to": $scope.data.designer.id,
					"from": AuthService.getUser().data.id,
					"text" : res
				}),{
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				}).then(function successCallback(response) {
					// console.log("Success", response);
					$ionicLoading.hide();
				}, function errorCallback(response) {
					// console.log("Error", response);
					$ionicLoading.hide();
				});
			}
		});
	}
});