angular.module('imageID.controllers').controller('HouseCtrl', function($scope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, Restangular, MemoryService, $ionicSlideBoxDelegate, $cordovaSocialSharing) {
    $scope.data = {};
    $scope.title = "House";

    $scope.data.house = MemoryService.getData("house");

    $scope.renderData = function() {
        $scope.title = $scope.data.house.post_title;

        $timeout(function() {
            $scope.$apply();
            $ionicSlideBoxDelegate.update();
        }, 100);
    }

    if ($scope.data.house != null && $scope.data.house.id == $stateParams.id) {
        $scope.renderData();
    } else {
        $ionicLoading.show({
            template: 'Loading..'
        });
        $scope.productPromise = Restangular.all("type/house/" + $stateParams.id).getList().then(function(posts) {
            $scope.data.house = posts[0];
            $scope.renderData();
            $ionicLoading.hide();
        }).catch(function(err) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                template: 'Error loading data'
            });
        });
    }

    $scope.pagerClick = function(index) {
        $ionicSlideBoxDelegate.slide(index);
    }

    $scope.share = function() {
        $cordovaSocialSharing.share($scope.data.house.post_title, $scope.data.house.post_title, null, $scope.data.house.url);
    }
});
