'use strict';

/* category Controller */

ngApp.lazy.controller('categoryCtrl', function($scope, $log, $http, CategoryFactory) {

	var categoryScope = this;
	categoryScope.showAll = true;
	categoryScope.category = {};
	categoryScope.isLoading = true;
	
	categoryScope.set = function() {
		
		var setMethod = "save";
		if (parseInt(categoryScope.category._id) > 0) {
			setMethod = "update";
		}
		categoryScope.isLoading = true;

		console.log (categoryScope.category);

		CategoryFactory[setMethod](categoryScope.category, function (data) {
			
			//categoryScope.all.push(data);
			get();
			categoryScope.showAll = true;
			categoryScope.isLoading = false;
			Materialize.toast('Category is saved!', 3000, 'rounded');
			
		}, function (error) {
			$log.log (error);
			
		});
		
		
		/*$http[setMethod]('categoryController', {
			data: categoryScope.category
		}).success(function(data) {
			//categoryScope.all.push(data);
			get();
			categoryScope.showAll = true;
			categoryScope.isLoading = false;
			Materialize.toast('Note is saved!', 3000, 'rounded');
		}).error(function(error) {
			$log.log("ERROR: "+error);
			categoryScope.isLoading = false;
		});*/
	};

	categoryScope.edit = function (args) {
		categoryScope.showAll = false;
		//angular.copy(emptycategory, categoryScope.category);
		angular.copy(args.thisCategory, categoryScope.category);
	};
	
	var get = function () {
		categoryScope.isLoading = true;
		
		
		categoryScope.all = CategoryFactory.query({}, function() {
			categoryScope.showAll = true;
			categoryScope.isLoading = false;
		 
		}, function (error) {
			$log.log (error);
			categoryScope.isLoading = false;
			
		});
		
		
		/*$http.get('categoryController', {
			data: {}
		}).success(function(data) {
			$log.log (data);
			categoryScope.all = data;
			categoryScope.showAll = true;
			categoryScope.isLoading = false;
		}).error(function(error) {
			$log.log("ERROR: "+error);
			categoryScope.isLoading = false;
		});*/
	};
	
	
	categoryScope.delete = function(args) {
		if(confirm("Are you sure ? ")) {
			categoryScope.isLoading = true;

			$log.log (args);

			CategoryFactory.delete({_id:  args._id}, function() {
				Materialize.toast('Category is removed!', 3000, 'rounded');
				get();
				categoryScope.isLoading = false;
			 
			}, function (error) {
				$log.log (error);
				categoryScope.isLoading = false;
				
			});
			//GAE DELETE
			/*$http.delete('categoryController?id='+args._id, {
				//data: args
			}).success(function(data) {
				Materialize.toast('Category is removed!', 3000, 'rounded');
				get();
				categoryScope.isLoading = false;
			}).error(function(error) {
				$log.log("ERROR: "+error);
				categoryScope.isLoading = false;
			});*/
		}
	};
	
	categoryScope.prepareSetUI = function () {
		angular.copy({}, categoryScope.category);
		categoryScope.showAll = false;
	};
	
	get();
});