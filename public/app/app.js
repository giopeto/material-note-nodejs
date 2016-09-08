//Define an angular module for our app
var ngApp = angular.module('ngApp', ['ngRoute', 'ngResource']);



ngApp.controller('appCtrl', function($scope,  $http, $log) {

/*
	var appScope = this;
	appScope.allCategory = [];
	appScope.asd = 1;
	$http.get('categoryController', {
	}).success(function(data) {

		appScope.allCategory = data;

		$log.log ("data1: ", appScope.allCategory);
	}).error(function(error) {
		console.log("ERROR: "+error);
		
	});
*/

});

ngApp.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide, $routeProvider, $httpProvider, $locationProvider) {
	
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	$locationProvider.html5Mode = true;
	ngApp.lazy = {
        controller: $controllerProvider.register,
       	directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };

	$routeProvider.when('/items', {
		templateUrl: 'app/items/items.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/items/items.service.js',
					'app/items/items.controller.js',
					'app/groups/groups.service.js',

				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function () {
						console.log ('ERROR');
					});
				});
				return deferred.promise;
			}]
		}
	});

	$routeProvider.when('/items_add_edit/:id', {
		templateUrl: 'app/items/items_add_edit.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/items/items.service.js',
					'app/items/items.controller.js',
					'app/groups/groups.service.js',

				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function () {
						console.log ('ERROR');
					});
				});
				return deferred.promise;
			}]
		}
	});

	$routeProvider.when('/groups', {
		templateUrl: 'app/groups/groups.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/groups/groups.service.js',
					'app/groups/groups.controller.js',

				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function () {
						console.log ('ERROR');
					});
				});
				return deferred.promise;
			}]
		}
	});

	$routeProvider.when('/groups_add_edit/:id', {
		templateUrl: 'app/groups/groups_add_edit.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/groups/groups.service.js',
					'app/groups/groups.controller.js',

				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function () {
						console.log ('ERROR');
					});
				});
				return deferred.promise;
			}]
		}
	});
	$routeProvider.otherwise({
		redirectTo: '/items',
	});

 /*   $routeProvider.when('/note/:categoryId', {
		templateUrl: 'app/templates/note/note.html',
		customData: 'note Custom Data returned from RouteProvider',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/controllers/note/note_add_edit.js',
					'app/services/note/note_factory.js',
					'app/services/category/category_factory.js',
					/!*'app/controllers/main/main.js',*!/
					
				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function (error) {
						console.log ('ERROR: ', error);
					});
				});
				return deferred.promise;
			}]
		}
    }).when('/note_add_edit/:id', {
		templateUrl: 'app/templates/note/note_add_edit.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/controllers/note/note_add_edit.js',
					'app/services/note/note_factory.js',
					'app/services/category/category_factory.js',
				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function (error) {
						console.log ('ERROR: ', error);
					});
				});
				return deferred.promise;
			}]
		}
    }).when('/category_add_edit', {
		templateUrl: 'app/templates/category/category_add_edit.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/controllers/category/category.controller.js',
					'app/services/category/category_factory.js',
				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function (error) {
						console.log ('ERROR: ', error);
					});
				});
				return deferred.promise;
			}]
		}

	}).when('/category_add_edit/:id', {
		templateUrl: 'app/templates/category/category_add_edit.html',
		resolve: {
			load: ['$q', '$rootScope', function ($q, $rootScope) {
				var deferred = $q.defer();
				require([
					'app/controllers/category/category.controller.js',
					'app/services/category/category_factory.js',
				], function () {
					$rootScope.$apply(function () {
						deferred.resolve();
					}, function (error) {
						console.log ('ERROR: ', error);
					});
				});
				return deferred.promise;
			}]
		}

	}).otherwise({
		redirectTo: '/note/all',
	});
*/
    
    
    


});