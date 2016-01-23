(function($) {
  $(document).ready(function() {

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      stickIt(this);
    });

    // For less capable browsers, only execute sticky on desktop.
    if (!window.matchMedia || $('.lt-ie9').length) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
      return;
    }

    if (Components.utils.breakpoint('desktop')) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.breakpoint('tablet')) {
      $('.sticky--tablet').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.breakpoint('mobile')) {
      $('.sticky--mobile').each(function(i) {
        stickIt(this);
      });
    }
  });

  function stickIt(el) {
    var sticky = new Waypoint.Sticky({
      element: el
    });
  }
})(jQuery);
