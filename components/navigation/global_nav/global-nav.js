/**
 * Global gavigation interactions
 */
(function($){
  $(document).ready(function() {
    var $globalNav = $('.global-nav'),
        $menu = $globalNav.find('.global-nav__menu'),
        $hamburger = $globalNav.find('.hamburger'),
        $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
        $mobileDrawerClose = $('.global-nav__drawer-close'),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        };

    // Do some initial sizing.
    sizing();

    // Mobile menu
    $hamburger.on('click.global-nav', function(e) {
      $mobileWrapper.toggleClass('is-open');
      $hamburger.parent().toggleClass('open');
      e.preventDefault();
    });

    // Prepare our menu for the user's viewport.
    function sizing() {
      // Tablet/Mobile
      if (Components.utils.breakpoint('tablet') || Components.utils.breakpoint('mobile')) {
        // Adjust the height of the mobile menu
        mobileHeightAdjust();

        // Delay adding this class to prevent CSS transitions from firing when
        // switching from desktop to tablet/mobile.
        setTimeout(function() {
          $mobileWrapper.addClass('is-mobile');
        }, animation.duration);
      }
      // Desktop
      else {
        // Remove any mobile markup, and revert to original settings.
        $hamburger.removeClass('hamburger--open');
        $hamburger.parent().removeClass('open');
        $mobileWrapper.removeAttr('style').removeClass('is-mobile is-open');
      }
    }

    // Adjust the height of the mobile menu to take up the entire height.
    function mobileHeightAdjust() {
      var origHeight = $mobileWrapper.data('orig-height');

      if (isNaN(origHeight)) {
        origHeight = $mobileWrapper.height();
        $mobileWrapper.data('orig-height', origHeight);
      }
    }
  });

})(jQuery);
