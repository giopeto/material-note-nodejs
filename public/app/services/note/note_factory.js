'use strict';

/* NoteFactory Factory */

ngApp.lazy.factory('NoteFactory', function($resource, $q, $log) {
	
	 var resource = $resource('notes/noteController/:_id', {_id : '@_id'}, {
		update: {
			method: 'PUT'
		}
	       
	 });
	 
	 return resource;
});