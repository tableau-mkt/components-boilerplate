(function($) {
  /**
   * Callback function to insert the menu into the DOM.
   */
  window.tabAjaxMegaMenu = function(data) {
    var commands = {
      insert: function (response) {
        $(response.selector)[response.method](response.data);
      }
    };

    // Execute our commands.
    for (var i in data) {
      if (data[i]['command'] && commands[data[i]['command']]) {
        commands[data[i]['command']](data[i]);
      }
    }

    // Trigger event when our menu has been loaded.
    $(document).trigger('tabAjaxMegaMenu:ready');
  };
})(jQuery);
