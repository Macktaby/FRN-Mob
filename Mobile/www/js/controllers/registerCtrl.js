angular.module('imageID.controllers').controller('RegisterCtrl', function($scope, $timeout, $state, AuthService, $ionicLoading) {
	$scope.user = {};

	$scope.doRegister = function(){
	
		$ionicLoading.show({
			template: 'Registering user...'
		});
	
		var user = {
			userName: $scope.user.userName,
			password: $scope.user.password,
			email: $scope.user.email,
			displayName: $scope.user.displayName
		};
	
		AuthService.doRegister(user).then(function(user){
			//success
			$ionicLoading.hide();
			$scope.$parent.loggedIn = true;
      
			localStorage.setItem("user", JSON.stringify({
				"userName" : $scope.user.userName,
				"password" : $scope.user.password
			}));
			history.back();
		},function(err){
			//err
			$scope.error = err;
			$ionicLoading.hide();
		});
	};
});