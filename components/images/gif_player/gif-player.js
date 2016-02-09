/**
 * Gif Player utility.
 */
(function($){
  $(document).ready(function(){
    var $gifs = $('.gif-player');

    if ($gifs.length) {
      $gifs.each(function(index, el) {
        var $gif = $(this);

        // Store the static image source
        $gif.data('static-src', $gif.attr('src'));

        // Lazy load in gifs so they start animating after brought into view.
        // Switch back to placeholder when image has exited view.
        //
        // @todo store gif length in a data param and indicate when the gif is
        // being animated vs static. Add a replay button once the loop ends
        var inview = new Waypoint.Inview({
          element: $gif[0],
          entered: function(direction) {
            $gif.attr('src', $gif.data('gif-src'));
          },
          exited: function(direction) {
            $gif.attr('src', $gif.data('static-src'));
          }
        });

      });
    }
  });
})(jQuery);
