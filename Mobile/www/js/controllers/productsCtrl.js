angular.module('imageID.controllers').controller('ProductsCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state) {
	$scope.data = {};
	$scope.title = "Showroom";
	
	$scope.showroomPromise = Restangular.all("type/product").getList().then(function(posts) {
		$scope.data.products = posts;
		$scope.data.showrooms = [];
		$scope.data.brands = [];
		$scope.data.categories = [];
		
		var vendorIDs = [];
		var showroomIDs = [];
		var categoryIDs = [];
		
		for(var i = 0; i < $scope.data.products.length; i++){
			$scope.data.products[i].brandID = $scope.data.products[i].brand.ID;
			if(vendorIDs.indexOf($scope.data.products[i].brand.ID) < 0){
				vendorIDs.push($scope.data.products[i].brand.ID);
				$scope.data.brands.push($scope.data.products[i].brand);
			}
			
			$scope.data.products[i].showroomID = $scope.data.products[i].showroom.ID;
			if(showroomIDs.indexOf($scope.data.products[i].showroom.ID) < 0){
				showroomIDs.push($scope.data.products[i].showroom.ID)
				$scope.data.showrooms.push($scope.data.products[i].showroom);
			}
			
			$scope.data.products[i].categoryID = $scope.data.products[i].category.ID;
			if(categoryIDs.indexOf($scope.data.products[i].category.ID) < 0){
				categoryIDs.push($scope.data.products[i].category.ID)
				$scope.data.categories.push($scope.data.products[i].category);
			}
		}
		
		jQuery('.sort-holder').openClose({
			hideOnClickOutside: true,
			activeClass: 'active',
			opener: '.opener',
			slider: '.slide',
			animSpeed: 200,
			effect: 'slide'
		});
	}).catch(function(err) {
		$scope.data.showroom = [];
	});
	
	$scope.openProduct = function(p){
		$state.go("app.product", { "id" : p.id });
	}
	
	$scope.setBrandFilter = function(t){
		$scope.brandFilter = t;
		$("#productsArea").trigger("click");
	}
	
	$scope.setCategoryFilter = function(t){
		$scope.categoryFilter = t;
		$("#productsArea").trigger("click");
	}
	
	$scope.setShowroomFilter = function(t){
		$scope.showroomFilter = t;
		$("#productsArea").trigger("click");
	}
});