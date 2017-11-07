import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { OHIF } from 'meteor/ohif:core';
import { viewportUtils } from '../../../lib/viewportUtils';

Template.downloadDialog.onCreated(() => {
    const instance = Template.instance();

    instance.autorun(() => {
        Session.get('UpdateDownloadViewport');
        const activeViewport = viewportUtils.getActiveViewportElement();

        if (activeViewport) {
          const enabledElement = cornerstone.getEnabledElement(activeViewport);
          // const context = enabledElement.canvas.getContext('2d');
          // const downloadContext = instance.$downloadCanvas.getContext('2d');
          // const { width, height } = enabledElement.canvas;

          // downloadContext.drawImage(enabledElement.canvas, 0, 0);

          // console.log(downloadContext);

          cornerstone.loadImage(enabledElement.image.imageId).then(function (image) {
            cornerstone.displayImage(instance.$elementDownload, image);
            cornerstone.resize(instance.$elementDownload, true);
          });
        }
    })
});

Template.downloadDialog.onRendered(() => {
    const instance = Template.instance();
    const $dialog = instance.$('#downloadDialog');
    const singleRowLayout = OHIF.uiSettings.displayEchoUltrasoundWorkflow;

    instance.$elementDownload = $('#downloadElement')[0];
    cornerstone.enable(instance.$elementDownload);
    instance.$downloadCanvas = $('#downloadElement canvas')[0];


    // set dialog in optimal position and make sure it continues in a optimal position...
    // ... when the window has been resized
    // instance.setOptimalPosition(null, { top: singleRowLayout ? 47 : 26 });

    // The jQuery method does not seem to be working...
    // ... $(window).resize(instance.setOptimalPosition)
    // This requires additional investigation.
    // instance.setResizeHandler(instance.setOptimalPosition);

    // Make the CINE dialog bounded and draggable
    $dialog.draggable({ defaultElementCursor: 'move' });

    // Polyfill for older browsers
    dialogPolyfill.registerDialog($dialog.get(0));

    // // Prevent dialog from being dragged when user clicks any button
    const $controls = $dialog.find('.form-group, .instructions, #downloadElement');
    $controls.on('mousedown touchstart', event => event.stopPropagation());
});

Template.downloadDialog.events({
    'click .dropdown-menu .dropdown-item'(event, instance) {
        const extension = $(event.currentTarget).text();
        const $extensionButton = $('.btn.extension');

        $extensionButton.text(extension);
    },

    'change .form-group input[name=width]'(event, instance) {
        const width = $(event.currentTarget).val();

        $(instance.$elementDownload).width(width);
        cornerstone.resize(instance.$elementDownload, true);
    },

    'change .form-group input[name=height]'(event, instance) {
        const height = $(event.currentTarget).val();

        $(instance.$elementDownload).height(height);
        cornerstone.resize(instance.$elementDownload, true);
    },

    'click button.download'(event, instance) {
        const fileName = $('.fileName').val();
        const extension = $('.btn.extension').text();

        if (!fileName || !extension) {
          return;
        }

        cornerstoneTools.saveAs(instance.$elementDownload, `${fileName}.${extension}`, `image/${extension}`);
    },

    'click button.cancel'(event, instance) {
      viewportUtils.toggleDownloadDialog();
    }
});