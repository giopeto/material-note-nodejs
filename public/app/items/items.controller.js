'use strict';

/* Items Controller */

ngApp.lazy.controller('itemsCtrl', function($scope, $log, $http, $location, $routeParams, GroupFactory, ItemFactory, MenuFactory) {
    var vm = this;
    vm.isLoading = false;
    vm.obj = {};
    vm.allObj = [];
    vm.allGroup = GroupFactory.query({userId: MenuFactory.getUser()._id});


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
        vm.allObj = ItemFactory.query({groupId: $routeParams.groupId, userId: MenuFactory.getUser()._id}, function() {
            vm.obj._group = MenuFactory.getGroupId();
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
        if (MenuFactory.getGroupId()) {
            $location.path('/items_by_group_id/'+MenuFactory.getGroupId());
        } else {
            $location.path('/items');
        }

    };

    function changeLoadingState(){
        vm.isLoading = !vm.isLoading;
    };

    if ($routeParams.groupId && $routeParams.groupId != 0) {
        MenuFactory.setGroupId($routeParams.groupId);
    } else if (!$routeParams.id) {
        MenuFactory.setGroupId(0);
    }
    if ($routeParams.id && $routeParams.id != 0) {
        changeLoadingState();
        vm.obj = ItemFactory.get({ id: $routeParams.id }, function (data) {
            vm.obj._group = MenuFactory.getGroupId();
            changeLoadingState();
        }, function (error) {
            $log.log ("Error: ", error);
            changeLoadingState();
        });
    } else {
        get();
    }



    /**/

    var loadFromFile = function () {
        $http.get('app/data.json').success(function (data) {
            data.greetings.forEach(function (v) {
                $log.log(v);
                var args = {
                    name: v.content,
                    description: v.content
                };
                ItemFactory.save(args, function (data) {
                }, function (error) {
                    $log.log("Error: ", error);
                });
            });
        });
    };
    //loadFromFile();


});