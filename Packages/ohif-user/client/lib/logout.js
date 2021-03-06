import { Meteor } from 'meteor/meteor';
import { OHIF } from 'meteor/ohif:core';

OHIF.user.logout = () => Meteor.logout(error => {
    if (error) {
        OHIF.ui.showDialog('dialogInfo', {
            title: 'Error',
            message: error.reason
        });
    }
});
