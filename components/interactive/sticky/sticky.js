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

    if (matchMedia('(min-width: 961px)').matches) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
    }

    if (matchMedia('(max-width: 960px) and (min-width: 640px)').matches) {
      $('.sticky--tablet').each(function(i) {
        stickIt(this);
      });
    }

    if (matchMedia('(max-width: 639px)').matches) {
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
