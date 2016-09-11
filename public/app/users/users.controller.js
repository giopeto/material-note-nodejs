'use strict';

/* Users Controller */

ngApp.lazy.controller('usersCtrl', function($scope, $log, $location, $routeParams, $http, UserFactory) {
	var vm = this;
	vm.isLoading = false;
	vm.obj = {_csrf: ""};
	vm.allObj = [];

	console.log ($routeParams);
	//vm.save = save;
	//vm.get = get;
	vm.signup = signup;
	vm.signin = signin;
	/*vm.update = update;
	vm.addEdit = addEdit;
	vm.remove = remove;
	vm.goBack = goBack;*/

	function signup () {

		$http.post('users/users/signup',
			vm.obj
		).success(function(data) {
			$log.log("LOGIN: ", data);
			vm.obj.messages = "Sign up successful!";
		}).error(function(error) {
			$log.log("ERROR LOGIN: "+error);
			vm.obj.messages = "Sign up failed!";
		});
	}

	function signin () {

		$http.post('users/users/signin',
			vm.obj
		).success(function(data) {
			$log.log("signin: ", data);
			//vm.obj.messages = "Sign up successful!";
		}).error(function(error) {
			$log.log("ERROR signin: ", error);
			//vm.obj.messages = "Sign up failed!";
		});
	}
	/*function save () {
		changeLoadingState();
		UserFactory.save(vm.obj, function (data) {
			//goBack();
		}, function (error) {
			$log.log("Error: ", error);
			changeLoadingState();
		});
	};*/

	function get () {
		$http.get('users/users/signup').success(function(data) {
			vm.obj._csrf = data.csrfToken;
			//vm.obj.messages = data.messages;
		}).error(function(error) {
			$log.log("ERROR: "+error);
		});


	};

	function changeLoadingState(){
		vm.isLoading = !vm.isLoading;
	};

	get(); //This is stupid
});