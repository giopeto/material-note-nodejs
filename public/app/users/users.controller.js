'use strict';

/* Users Controller */

ngApp.lazy.controller('usersCtrl', function($scope, $log, $location, $routeParams, UserFactory) {
	var vm = this;
	vm.isLoading = false;
	vm.obj = {_csrf: ""};
	vm.allObj = [];


	vm.save = save;
	//vm.get = get;
	vm.signup = signup;
	/*vm.update = update;
	vm.addEdit = addEdit;
	vm.remove = remove;
	vm.goBack = goBack;*/

	function signup () {
		changeLoadingState();
		vm.obj = UserFactory.get(vm.obj, function (data) {

			changeLoadingState();
		}, function (error) {
			$log.log ("Error: ", error);
			changeLoadingState();
		});
	}

	function save () {
		changeLoadingState();
		UserFactory.save(vm.obj, function (data) {
			//goBack();
		}, function (error) {
			$log.log("Error: ", error);
			changeLoadingState();
		});
	};

	function get () {
		changeLoadingState();
		vm.allObj = UserFactory.query({}, function(data) {
			changeLoadingState();
			$log.log (data[0]);
			vm.obj._csrf = data[0].csrfToken;
		}, function (error) {
			$log.log ("Error: ", error);
			changeLoadingState();
		});
	};

	function changeLoadingState(){
		vm.isLoading = !vm.isLoading;
	};

	get(); //This is stupid
});