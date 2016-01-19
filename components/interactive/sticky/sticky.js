(function($){
  $(document).ready(function(){

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      stickIt(this);
    });

    if (Components.utils.isDesktop()) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.isTablet()) {
      $('.sticky--tablet').each(function(i) {
        stickIt(this);
      });
    }

    if (Components.utils.isMobile()) {
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
