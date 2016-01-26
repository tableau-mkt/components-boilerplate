/**
 * A re-implementation of jQuery's slideDown() and slideUp() that animates the
 *  height of an element without requiring the use of display: none;
 *
 *  Helpful when needing to hide a video player while maintaining control via an
 *  API.
 *
 *  The element must have "overflow: hidden;" set in CSS for this to work properly.
 *  In order to have the element hidden by default, you mist also set "height: 0;"
 *  in CSS as well.
 */

(function ($) {

  $.fn.slideHeight = function (direction, options) {
    var $el = $(this);

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
        function () {
          // Reset the height to auto to ensure the height remains accurate on viewport resizing
          $el.css('height', 'auto');
        }
      );
    }

    if (direction === "up") {
      options.complete = function () {
        // Enforce height zero.
        $el.css('overflow', 'hidden');
      };
      $el.animate({
        height: 0
      }, options);
    }

    return this;
  };

})(jQuery);
