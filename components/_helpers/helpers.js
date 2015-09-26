var Tabia = Tabia || {};

Tabia.yo = function(content) {
  window.console && console.log(content || "Yo");
};

Tabia.later = function(func, time) {
  setTimeout(func, time || 2000);
};


/**
 * Smooth Scroll to top of an element
 * @param  {jQuery Object} $element - Element to scroll to the top of
 * @param  {integer} duration       - Length of the animation
 * @param  {integer} offset         - Any offset to account for sticky elements
 * @param  {boolean} onlyUp         - Whether scroll should only happen if the scroll direction is up
 */
function smoothScrollTop($element, duration, offset, onlyUp) {
  duration = duration || 500;
  offset = offset || 0;
  onlyUp = onlyUp || false;

  var elementTop = $element.offset().top,
      pageTop = $(window).scrollTop(),
      scroll = !onlyUp;

  if (onlyUp && pageTop > elementTop) {
    scroll = true;
  }

  if (scroll) {
    $('body, html').animate({
      scrollTop: elementTop - offset
    }, duration);
  }
}


/*
A re-implementation of jQuery's slideDown() and slideUp() that animates the
height of an element without requiring the use of display: none;

Helpful when needing to hide a video player while maintaining control via an
API.

The element must have "overflow: hidden;" set in CSS for this to work properly.
In order to have the element hidden by default, you mist also set "height: 0;"
in CSS as well.
*/

(function ( $ ) {
  $.fn.slideHeight = function(direction, options) {

    var $el = $(this),
        options = options || {duration: 400, easing: "swing"};

    if (direction === "down") {
      var $elClone = $el.clone().show().css({"height":"auto"}).appendTo($el.parent()),
          elHeight = $elClone.outerHeight(true);

      // Removing clone needed for calculating height.
      $elClone.remove();

      $el.animate({
          height: elHeight
        },
        options.duration,
        options.easing,
        function() {
          // Reset the height to auto to ensure the height remains accurate on viewport resizing
          $el.css('height', 'auto');
        }
      );
    }

    if (direction === "up") {
      $el.animate({
        height: 0
      }, options);
    }

    return this;
  };
}( jQuery ));


/**
 * General Brightcove video embed binding.
 *
 * This is a generic setup for in-page embedded players. We can bind a VideoJS wrapped object to a data property on the player DOM element, allowing us to control players by selecting the DOM element and accessing the bcPlayer data property. E.g.:
 *
 * $('#my-playerthing').data('bcPlayer').play();
 * $('#my-playerthing').data('bcPlayer').pause();
 *
 * A more complicated example that retrieves the full video metadata via the Brightcove catalog method:
 *
 * var $video = $('#my-player-object');
 *
 * $video.data('bcPlayer').catalog.getVideo($video.data('videoId'),
 * function(error, data) {
 *   // Do things with the return.
 *   console.log(data);
 * });
 *
 * This presumes that the Brightcove API script has been loaded on page.
 */
(function ($, window) {
  $(document).ready(function() {
    // Use the default Brightcove embed selector.
    var $players = $('.video-js');

    // Bail early if there aren't even any players.
    if (!$players.length || !typeof window.videojs === 'function') {
      return;
    }

    $players.each(function setupBrightcoveInstances() {
      var $this = $(this),
        BCPlayer;

      // Pass in the DOM element, not the jQuery wrapped object.
      BCPlayer = window.videojs($this[0]).ready(function prepareBrightcoveInstance() {
        $this.data('bc-player', this);
        $(document).trigger('brightcove:ready', $this.attr('id'));
      });
    });
  });
})(jQuery, window);
