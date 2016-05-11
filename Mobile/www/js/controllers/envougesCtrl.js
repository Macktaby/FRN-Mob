angular.module('imageID.controllers').controller('EnvougesCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.envouges = [];
	
	$scope.$on("$ionicView.enter", function(event, data){
		$('input').blur();
	});
	
	$scope.envougesPromise = Restangular.all('type/EnVogue').getList().then(function(posts) {
		$scope.data.envouges = posts;
	}).catch(function(err) {
		$scope.data.envouges = [];
	});
	
	$scope.goToDetails = function(v){
		MemoryService.putData("envouge", v);
		$state.go("app.envouge", { "id" : v.id });
	}
});