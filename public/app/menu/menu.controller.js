/**
 * Created by george on 9/8/16.
 */
'use strict';

/* Menu Controller */

ngApp.controller('menuCtrl', function($scope, $log, GroupFactory) {
    var vm = this;
    vm.allGroup = GroupFactory.query();
});