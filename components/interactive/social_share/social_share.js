/**
 * Social share handling
 *
 * This is a simple hover based reveal for the social share display.
 */
(function ($, window) {
  $(document).ready(function () {
    var $socialShare = $('.social-share');

    // Bail early if there aren't even any element.
    if (!$socialShare.length) {
      return;
    }

    // Utilize the revealContent plugin.
    $socialShare.each(function initSocialShare() {
      var $this = $(this),
          $widgets = $('.social-share__widgets'),
          animation = {
            duration: 500,
            easing: "easeInOutQuart"
          };

      $this.hover(
        function socialHoverOn() {
          $widgets.slideHeight('down', animation);
        },
        function socialHoverOff() {
          $widgets.slideHeight('up', animation);
        }
      );
    });

  });
})(jQuery, window);
