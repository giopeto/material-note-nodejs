'use strict';

/* todo Controller */

ngApp.lazy.controller('todoCtrl', function($scope, $log, $http, $location, $routeParams, NoteFactory, CategoryFactory) {

	var todoScope = this;
	todoScope.todo = {};
	todoScope.isLoading = true;
	
	todoScope.allCategory = CategoryFactory.query();
	
	
	
	todoScope.set = function() {
		
		var setMethod = "save";
		if ($routeParams.id > 0) {
			setMethod = "update";
		}
		todoScope.isLoading = true;
		
		NoteFactory[setMethod](todoScope.todo, function (data) {
			
			todoScope.isLoading = false;
			Materialize.toast('Note is saved!', 3000, 'rounded');
			$location.path('/note_add_edit');
		}, function (error) {
			$log.log (error);
			todoScope.isLoading = false;
			
		});
	};

	todoScope.edit = function (args) {
		angular.copy(args.thisTodo, todoScope.todo);
		
		$location.path('/note_add_edit/'+args.thisTodo.id);
		
	};
	
	var get = function (args) {
		todoScope.isLoading = true;
		
		if (!$routeParams.id) {
			todoScope.all = NoteFactory.query({}, function() {
				todoScope.isLoading = false;
				if (parseInt($routeParams.categoryId) > 0) {
					todoScope.all = todoScope.all.filter(function (v) {
						return v.categoryId == $routeParams.categoryId
					});
				}
			}, function (error) {
				$log.log (error);
				todoScope.isLoading = false;
				
			});
		} else if ($routeParams.id > 0){
			/*todoScope.todo = NoteFactory.get({ id: $routeParams.id }, function() {
				
				todoScope.isLoading = false;
			 
			}, function (error) {
				$log.log (error);
				todoScope.isLoading = false;
				
			});*/
			$http.get('noteController?id='+$routeParams.id, {
				data: {}
			}).success(function(data) {
				todoScope.todo = data;
				todoScope.isLoading = false;
			}).error(function(error) {
				$log.log("ERROR: "+error);
				todoScope.isLoading = false;
			});
			
		}
		
		/*$http.get('noteController', {
			data: {
				
			}
		}).success(function(data) {
			$log.log (data);
			if (!args.id) {
				todoScope.all = data;
			} else {
				
			}
			
			todoScope.showAll = true;
			todoScope.isLoading = false;
		}).error(function(error) {
			$log.log("ERROR: "+error);
			todoScope.isLoading = false;
		});*/
	};
	
	
	todoScope.delete = function(args) {
		if(confirm("Are you sure ? ")) {
			todoScope.isLoading = true;
			$http.delete('noteController?id='+args.id, {
				//data: args
			}).success(function(data) {
				Materialize.toast('Note is removed!', 3000, 'rounded');
				get();
				todoScope.isLoading = false;
			}).error(function(error) {
				$log.log("ERROR: "+error);
				todoScope.isLoading = false;
			});
		}
	};
	
	todoScope.prepareSetUI = function () {
		angular.copy({}, todoScope.todo);
		$location.path('/note_add_edit/0');
	};
	
	
	var loadFromFile = function () {
		$http.get('app/controllers/category/gae_bkp.js').success(function(data) {
		    $log.log (data);
		    
		    data.greetings.forEach(function (v) {
		    	 $log.log (v);
		    	 
		    	 //var saveArgs = {title: v.content, content: v.content, categoryId: "5095136883113984", date: v.date}
		    	 
		    	
		    	 $http.post('noteController', {
		    		 title: v.content, content: v.content, categoryId: "6090813381541888", date: v.date
		 		}).success(function(data) {
		 			
		 		}).error(function(error) {
		 			$log.log("ERROR: "+error);
		 			
		 		});
		    	 
		    	// data.greetings.length = 0;
		    	 
		    }); 
		});
	}
	
	//loadFromFile();
	get();
});