/**
 * Social share handling
 *
 * This is a simple hover based reveal for the social share display.
 */
(function ($) {
  $(document).ready(function () {
    var $socialShare = $('.social-share__toggle');

    // Bail early if there aren't even any elements.
    if (!$socialShare.length) {
      return;
    }

    $socialShare.each(function initSocialShare() {
      var $this = $(this),
          $widgets = $('.social-share__widgets'),
          animation = {
            duration: 500,
            easing: "easeInOutQuart"
          };

      $this.click(function(e) {
        e.preventDefault();

        $socialShare.toggleClass('is-active');
        $widgets.toggleClass('is-open');
      });
    });

  });
})(jQuery);
