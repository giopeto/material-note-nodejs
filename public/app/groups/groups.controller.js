'use strict';

/* Groups Controller */

ngApp.lazy.controller('groupsCtrl', function($scope, $log, $location, $routeParams, GroupFactory) {
    var vm = this;
    vm.isLoading = false;
    vm.obj = {};
    vm.allObj = [];


    vm.save = save;
    vm.get = get;
    vm.update = update;
    vm.addEdit = addEdit;
    vm.remove = remove;
    vm.goBack = goBack;

    function save () {
        changeLoadingState();
        GroupFactory.save(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function get () {
        changeLoadingState();
        vm.allObj = GroupFactory.query({}, function() {
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function update () {
        changeLoadingState();
        vm.obj.id = vm.obj._id;
        GroupFactory.update(vm.obj, function (data) {
            goBack();
        }, function (error) {
            $log.log("Error: ", error);
            changeLoadingState();
        });
    };

    function remove (args) {
        changeLoadingState();
        GroupFactory.delete({id: args._id}, function (data) {
            vm.allObj.splice(args.index, 1);
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    };

    function addEdit (args){
        var id = args._id ? args._id : 0;
        $location.path('/groups_add_edit/'+id);
    };

    function goBack () {
        $location.path('/groups');
    };

    function changeLoadingState(){
        vm.isLoading = !vm.isLoading;
    };

    if ($routeParams.id && $routeParams.id != 0) {
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