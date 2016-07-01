Template.lesionTableHUD.onRendered(() => {
    const instance = Template.instance();
    instance.$('#lesionTableHUD').resizable().draggable();
});

Template.lesionTableHUD.events({
    'click .buttonClose'(event, instance) {
        Session.set('lesionTableHudOpen', false);
    }
});

Template.lesionTableHUD.helpers({
    hudHidden() {
        return Session.get('lesionTableHudOpen') ? '' : 'hidden';
    },
    toolbarButtons() {
        var buttonData = [];

        buttonData.push({
            id: 'bidirectional',
            title: 'Target',
            classes: 'imageViewerTool',
            svgLink: '/packages/lesiontracker/assets/icons.svg#icon-tools-measure-target'
        });

        buttonData.push({
            id: 'nonTarget',
            title: 'Non-Target',
            classes: 'imageViewerTool toolbarSectionButton',
            svgLink: '/packages/lesiontracker/assets/icons.svg#icon-tools-measure-non-target'
        });

        buttonData.push({
            id: 'length',
            title: 'Temp',
            classes: 'imageViewerTool toolbarSectionButton',
            svgLink: '/packages/lesiontracker/assets/icons.svg#icon-tools-measure-temp'
        });

        return buttonData;
    }
});