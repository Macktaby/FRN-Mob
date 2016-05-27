// Ionic imageID App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'imageID' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'imageID.controllers' is found in controllers.js
angular.module('imageID', ['ionic', 'imageID.controllers', 'imageID.utils', 'imageID.services', 'cgBusy', 'imageID.directives', 'imageID.factories', 'restangular', 'ngCordova', 'ionic-ratings', 'ngCordovaOauth'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        $rootScope.favorties = [];
        $rootScope.rates = [];
        $rootScope.reserved = [];
        var f = localStorage.getItem("favorties");
        if (f != null && f.length > 1) {
            $rootScope.favorties = JSON.parse(f).favorties;
        } else {
            $rootScope.favorties = [];
        }
    });
})

// Prod
.constant('WORDPRESS_API_URL', 'http://isupsaas.com/imageID/api/')
    .constant('WORDPRESS_REST_BASE_URL', 'http://isupsaas.com/imageID/wp-json/wp/v2/imageid')

// Testing
// .constant('WORDPRESS_API_URL', 'http://mounir.io/imageid1/api/')
// .constant('WORDPRESS_REST_BASE_URL', 'http://mounir.io/imageid1/wp-json/wp/v2/imageid')
.constant('GCM_SENDER_ID', '758446630149')
    .constant('FACEBOOK_CLIENT_ID', '1060048270702910')
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider, $ionicConfigProvider, $sceDelegateProvider, $compileProvider, WORDPRESS_REST_BASE_URL) {
        $ionicConfigProvider.backButton.text('').previousTitleText(false);
        $ionicConfigProvider.tabs.style("standard");
        $ionicConfigProvider.tabs.position("bottom");
        $ionicConfigProvider.navBar.alignTitle("center");

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);
        $compileProvider.debugInfoEnabled(false);

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain. Notice the difference between * and **.
            'http://*.mounir.io/**',

            'http://*.inerdeg.com/**',
            'http://*.isupsaas.com/**'
        ]);

        $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html'
                }
            }
        })

        .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.posts', {
                url: '/posts',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/posts.html',
                        controller: 'PostsCtrl'
                    }
                }
            })

        .state('app.post', {
            url: '/posts/:postId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/post.html',
                    controller: 'PostCtrl'
                }
            }
        })

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })

        .state('app.vendors', {
            url: '/vendors',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vendors.html',
                    controller: 'VendorsCtrl'
                }
            }
        })

        .state('app.vendor', {
            url: '/vendor/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vendor.html',
                    controller: 'VendorCtrl'
                }
            }
        })

        .state('app.showrooms', {
            url: '/showrooms',
            views: {
                'menuContent': {
                    templateUrl: 'templates/showrooms.html',
                    controller: 'ShowroomsCtrl'
                }
            }
        })

        .state('app.showroom', {
            url: '/showroom/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/showroom.html',
                    controller: 'ShowroomCtrl'
                }
            }
        })

        .state('app.products', {
            url: '/products',
            views: {
                'menuContent': {
                    templateUrl: 'templates/products.html',
                    controller: 'ProductsCtrl'
                }
            }
        })

        .state('app.product', {
            url: '/product/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/product.html',
                    controller: 'ProductCtrl'
                }
            }
        })

        .state('app.designers', {
            url: '/designers',
            views: {
                'menuContent': {
                    templateUrl: 'templates/designers.html',
                    controller: 'DesignersCtrl'
                }
            }
        })

        .state('app.designer', {
            url: '/designer/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/designer.html',
                    controller: 'DesignerCtrl'
                }
            }
        })

        .state('app.houses', {
            url: '/houses',
            views: {
                'menuContent': {
                    templateUrl: 'templates/houses.html',
                    controller: 'HousesCtrl'
                }
            }
        })

        .state('app.house', {
            url: '/house/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/house.html',
                    controller: 'HouseCtrl'
                }
            }
        })

        .state('app.catalogs', {
            url: '/catalogs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/catalogs.html',
                    controller: 'CatalogsCtrl'
                }
            }
        })

        .state('app.envouges', {
            url: '/envouges',
            views: {
                'menuContent': {
                    templateUrl: 'templates/envouges.html',
                    controller: 'EnvougesCtrl'
                }
            }
        })

        .state('app.envouge', {
            url: '/envouge/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/envouge.html',
                    controller: 'EnvougeCtrl'
                }
            }
        })

        .state('app.register', {
            url: '/register',
            views: {
                'menuContent': {
                    templateUrl: 'templates/register.html',
                    controller: 'RegisterCtrl'
                }
            }
        })

        .state('app.contactUs', {
            url: '/contactUs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contactUs.html',
                    controller: 'ContactUsCtrl'
                }
            }
        })

        .state('app.myFavorites', {
            url: '/myFavorites',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myFavorites.html',
                    controller: 'MyFavoritesCtrl'
                }
            }
        })

        .state('app.myReserved', {
            url: '/myReserved',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myReserved.html',
                    controller: 'MyReservedCtrl'
                }
            }
        })

        .state('app.myProfile', {
            url: '/myProfile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/myProfile.html',
                    controller: 'MyProfileCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
        RestangularProvider.setBaseUrl(WORDPRESS_REST_BASE_URL);
    });
