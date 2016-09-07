'use strict';

/* Groups Controller */

ngApp.lazy.controller('itemsCtrl', function($scope, $log, $location, $routeParams, GroupFactory, ItemFactory) {
    var vm = this;
    vm.isLoading = false;
    vm.obj = {};
    vm.allObj = [];
    vm.allGroup = GroupFactory.query();

    vm.save = save;
    vm.get = get;
    vm.update = update;
    vm.addEdit = addEdit;
    vm.remove = remove;
    vm.goBack = goBack;

    function save () {
        changeLoadingState();
        ItemFactory.save(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function get () {
        changeLoadingState();
        vm.allObj = ItemFactory.query({}, function() {
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function update () {
        changeLoadingState();
        vm.obj.id = vm.obj._id;
        ItemFactory.update(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function remove (args) {
        changeLoadingState();
        ItemFactory.delete({id: args._id}, function (data) {
            vm.allObj.splice(args.index, 1);
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function addEdit (args){
        var id = args._id ? args._id : 0;
        $location.path('/items_add_edit/'+id);
    };

    function goBack () {
        $location.path('/items');
    };

    function changeLoadingState(){
        vm.isLoading = !vm.isLoading;
    };

    if ($routeParams.id && $routeParams.id != 0) {
        changeLoadingState();
        vm.obj = ItemFactory.get({ id: $routeParams.id }, function (data) {
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    } else {
        get();
    }

});