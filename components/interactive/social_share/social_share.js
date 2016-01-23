/**
 * Social share handling
 *
 * This is a simple hover based reveal for the social share display.
 */
(function ($) {
  $(document).ready(function () {
    var $socialShare = $('.social-share__toggle');

    $socialShare.each(function initSocialShare() {
      var $widgets = $(this).next('.social-share__widgets'),
          $both = $(this).add($widgets);

      $both.hover(function () {
        $both.doTimeout('open', 200, function() {
          $both.addClass('is-open');
        });
      }, function () {
        $both.doTimeout('open', 200, function() {
          $both.removeClass('is-open');
        });
      });

      $both.click(function (e) {
        e.preventDefault();
      });
    });

  });
})(jQuery);
