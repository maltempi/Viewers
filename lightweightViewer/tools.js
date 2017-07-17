module.exports = {
  active: '',
  toolsSelector: '.viewer-tools',
  deactivateActiveTool: function () {
    if (this.active) {
      this.deactivate(this.active);
      this.active = '';
    }
  },
  toggleTool: function (toolToActivate) {
    if (!toolToActivate) {
      return;
    }

    if (this.active) {
      this.deactivate(this.active);
    }

    cornerstoneTools[toolToActivate].enable(this.element);
    cornerstoneTools[toolToActivate].activate(this.element, 1);

    this.active = toolToActivate;
  },
  deactivate: function (tool) {
    cornerstoneTools[tool].disable(this.element);
    cornerstoneTools[tool].deactivate(this.element, 1);
  },
  initTools: function () {
    var self = this;

    $(this.toolsSelector).on('click', 'a[data-tool]', function (evt) {
      $('.active').removeClass('active');

      var $element = $(this);
      var tool = $element.attr('data-tool');

      self.toggleTool(tool);

      $element.addClass('active');
    });
  }
};
