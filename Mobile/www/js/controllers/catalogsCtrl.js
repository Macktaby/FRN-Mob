angular.module('imageID.controllers').controller('CatalogsCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.catalogs = [];
	
	$scope.catalogsPromise = Restangular.all('type/catalog').getList().then(function(posts) {
		$scope.data.catalogs = posts;
	}).catch(function(err) {
		$scope.data.catalogs = [];
	});
	
	$scope.goToDetails = function(v){
		if(ionic.Platform.isAndroid()){
			window.open("https://docs.google.com/gview?embedded=true&url=" + v.file, '_blank', 'location=no');
		} else {
			window.open(v.file, '_blank', 'location=no');
		}
		// MemoryService.putData("catalog", v);
		// $state.go("app.catalog", { "id" : v.id });
	}
});