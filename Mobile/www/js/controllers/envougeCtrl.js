angular.module('imageID.controllers').controller('EnvougeCtrl', function($scope, $timeout, $state, $stateParams, $ionicLoading, $ionicPopup, Restangular, MemoryService, $ionicSlideBoxDelegate, $cordovaSocialSharing) {
    $scope.data = {};
    $scope.title = "Envouge";

    $scope.data.envouge = MemoryService.getData("envouge");
    $scope.renderData = function() {
        $scope.title = $scope.data.envouge.post_title;

        $timeout(function() {
            $scope.$apply();
            $ionicSlideBoxDelegate.update();
        }, 100);
    }

    if ($scope.data.envouge != null && $scope.data.envouge.id == $stateParams.id) {
        $scope.renderData();
    } else {
        $ionicLoading.show({
            template: 'Loading..'
        });
        $scope.productPromise = Restangular.all("type/EnVogue/" + $stateParams.id).getList().then(function(posts) {
            $scope.data.envouge = posts[0];
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
        $cordovaSocialSharing.share($scope.data.envouge.post_title, $scope.data.envouge.post_title, null, $scope.envouge.product.url);
    }
});
