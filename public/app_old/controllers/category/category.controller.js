'use strict';

/* category Controller */

ngApp.lazy.controller('categoryCtrl', function($scope, $log, $location, $routeParams, CategoryFactory) {

    var vm = this;
    vm.isLoading = false;
    vm.obj = {};
    vm.allObj = [];


    vm.save = save;
    vm.get = get;
    vm.update = update;
    vm.addEdit = addEdit;
    vm.remove = remove;

    function save () {
        changeLoadingState();
        CategoryFactory.save(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function get () {
        changeLoadingState();
        vm.allObj = CategoryFactory.query({}, function() {
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function update () {
        changeLoadingState();
        CategoryFactory.update(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function remove (args) {
        changeLoadingState();
        CategoryFactory.delete(args, function (data) {
            vm.allObj.splice(args.index, 1);
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function addEdit (args){
        var id = args.id > 0 ? args.id : 0;
        $location.path('/category_add_edit/'+id);
    };

    function goBack () {
        $location.path('/category_add_edit');
    };

    function changeLoadingState(){
        vm.isLoading = !vm.isLoading;
    };

    if ($routeParams.id > 0) {
        changeLoadingState();
        vm.obj = GroupFactory.get({ id: $routeParams.id }, function (data) {
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    } else {
        get();
    }

});