// Other controllers

angular.module('imageID.controllers').controller('PostsCtrl', function($scope, $log, $wpApiPosts, $ionicLoading) {
  //$scope.navTitle='<img class="title-image" src="img/ImageIDLogo.png" />';
  $scope.posts = [];

  $ionicLoading.show({
    template: 'Loading...'
  });
  $wpApiPosts.getList({
      page: 1,
      per_page: 10,
      "filter[orderby]": "date",
      "filter[category_name]":"vendors"
  }).then(function(posts) {
      $log.debug("Got Posts...");
      $scope.posts = posts;
      $ionicLoading.hide();
  }).catch(function(err) {
    $ionicLoading.hide();
    $log.error("Get posts error", err);
  });
})

.controller('PostCtrl', function($scope, $stateParams, $log, $wpApiPosts, $ionicLoading) {
  $scope.postId = $stateParams.postId;
  
  $ionicLoading.show({
    template: 'Loading...'
  });
  $wpApiPosts.$get($scope.postId).then(function(post) {
      $scope.post = post;
      $log.debug("Got Post...");
      $ionicLoading.hide();
  }).catch(function(err) {
    $ionicLoading.hide();
    $log.error("Get post error", err);
  });
});
