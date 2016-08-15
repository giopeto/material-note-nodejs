'use strict';

/* CategoryFactory Factory */

// var userFactory = angular.module('userFactory', ['ngResource']);

ngApp.lazy.factory('CategoryFactory', function($resource, $q, $log) {
	
	 var resource = $resource('categories/categoryController/:_id', {_id : '@_id'}, {
		update: {
			method: 'PUT'
		}
	       
	 });
	 
	 return resource;
});