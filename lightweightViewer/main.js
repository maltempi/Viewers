var Files = require('./files');
var Tools = require('./tools');
var Commands = require('./commands');

cornerstone.registerImageLoader('example', Files.getExampleImage);

// THE LOARDER
var element = document.getElementById('conerstoneViewport');
var $thumb = $('.thumb');
var stack = {
  currentImageIdIndex: 0,
  imageIds: ['example://1', 'example://2', 'example://1']
};

Tools.element = element;
Commands.element = element;

$thumb.css('width', (100/stack.imageIds.length) + '%');

$(window).on('resize', function () {
  cornerstone.resize(element, true);
});

$(element).on('CornerstoneNewImage', function () {
  var currentIndex = stack.currentImageIdIndex;

  $thumb.css({
    'margin-left': ((100/stack.imageIds.length)*currentIndex) + '%'
  });
});

cornerstone.enable(element);
cornerstoneTools.mouseInput.enable(element);
cornerstoneTools.pan.activate(element, 2);
cornerstoneTools.zoom.activate(element, 4);
cornerstoneTools.mouseWheelInput.enable(element);

// Setting the stack tool
cornerstoneTools.addStackStateManager(element, ['stack']);
cornerstoneTools.addToolState(element, 'stack', stack);
cornerstoneTools.stackScrollWheel.activate(element);

// removing default context menu
element.oncontextmenu = function (evt) {
  evt.preventDefault();

  return false;
};

cornerstone.loadImage('example://1').then(function(image) {
  cornerstone.displayImage(element, image);
});

Tools.initTools();
Commands.initCommands();
