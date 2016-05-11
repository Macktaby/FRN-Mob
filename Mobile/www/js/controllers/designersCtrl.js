angular.module('imageID.controllers').controller('DesignersCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.designers = [];
	
	$scope.$on("$ionicView.enter", function(event, data){
		$('input').blur();
	});
	
	$scope.designersPromise = Restangular.all('type/designer').getList().then(function(posts) {
		$scope.data.designers = posts;
	}).catch(function(err) {
		$scope.data.designers = [];
	});
	
	$scope.goToDetails = function(v){
		MemoryService.putData("designer", v);
		$state.go("app.designer", { "id" : v.id });
	}
});