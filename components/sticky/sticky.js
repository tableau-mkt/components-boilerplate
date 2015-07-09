(function($){
  $(document).ready(function(){

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      var sticky = new Waypoint.Sticky({
        element: $(this)[0]
      });
    });

    if (matchMedia('(max-width: 960px)').matches) {
      $('.mobile-sticky').each(function(i) {
        var sticky = new Waypoint.Sticky({
          element: $(this)[0]
        });
      });
    }

  });
})(jQuery);
