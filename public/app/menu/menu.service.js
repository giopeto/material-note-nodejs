/**
 * Created by george on 9/8/16.
 */
'use strict';
/* MenuFactory Services */

ngApp.factory('MenuFactory', function() {
    var data = {
        groupId: 0
    };

    return {
        getGroupId: function () {
            return data.groupId;
        },
        setGroupId: function (groupId) {
            data.groupId = groupId;
        }
    };
});