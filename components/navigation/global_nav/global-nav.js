/**
 * Global gavigation interactions
 */
(function($){
  /**
   * Wait for custom event 'tabAjaxMegaMenu:ready' (i.e. menu drawers are fully loaded
   * via AJAX callback) before initiating mega menu client side behavior. If the drawers
   * are not being loaded via AJAX, the following snippet can be used to call the trigger
   *
   * $(document).ready(function() {
   *    $(document).trigger('tabAjaxMegaMenu:ready');
   * });
   *
   */
  $(document).one('tabAjaxMegaMenu:ready', function tabAjaxMenuReady() {
    var $globalNav = $('.global-nav__top'),
      $menu = $globalNav.find('.global-nav__primary-menu'),
      $expandableLinks = $menu.find('li a.expandable'),
      $drawers = $('.global-nav__drawers__drawer'),
      $hamburger = $globalNav.find('.hamburger'),
      $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
      $mobileDrawerClose = $('.global-nav__drawers__drawer__close'),
      animation = {
        duration: 150,
        easing: "linear"
      };
    /* Desktop stuff */
    if (matchMedia('(min-width: 961px)').matches) {
      // Drawer Expanding interaction

      $expandableLinks.each(function (){
        var $link = $(this),
            $drawer = $drawers.filter('#' + $link.data('drawer-id')),
            $both = $link.add($drawer);

        $both.hover(function () {
          $both.doTimeout( 'open', 200, function() {
            $both.addClass('is-open');
          });
        }, function () {
          $both.doTimeout( 'open', 200, function() {
            $both.removeClass('is-open');
          });
        });
      });

      $drawers.click(function(e) {
        e.stopPropagation();
      });
    }

    /* Tablet/mobile stuff */
    if (matchMedia('(max-width: 960px)').matches) {

      // Set the height of the dropdown content
      mobileHeightAdjust();

      $(window).resize(function(e) {
        mobileHeightAdjust()
      });

      $expandableLinks.on('click.nav', function(e) {
        var $link = $(this),
            $drawer = $('#' + $link.data('drawer-id'));

        $drawer.show().addClass('open');

        $drawer.add($mobileWrapper).animate({
          marginLeft: '-=100%'
        }, animation);

        e.preventDefault();
      });
    }

    $mobileDrawerClose.on('click.nav', function(e) {
      var $drawer = $(this).closest('.global-nav__drawers__drawer');

      closeDrawerMobile($drawer);

      e.preventDefault();
    });

    // Mobile menu
    $hamburger.on('click.global-nav', function(e) {
      var $openDrawer = $drawers.filter('.open'),
          drawerOptions = $.extend({}, animation);

      if ($openDrawer.length) {
        drawerOptions.done = function() {
          $openDrawer.css('margin-left', '100%');
          $mobileWrapper.css('margin-left', '0%');
        };

        $openDrawer.slideUp(drawerOptions).removeClass('open');
      }

      $mobileWrapper.slideToggle(animation);
      $hamburger.parent().toggleClass('open');
      e.preventDefault();
    });

    function closeDrawerMobile($drawer) {
      $drawer.add($mobileWrapper).animate({
        marginLeft: '+=100%'
      }, animation);

      setTimeout(function() {
        $drawer.hide().removeClass('open');
      }, animation.duration);
    }

    function mobileHeightAdjust() {
      // @todo this is pretty bad... Can probably figure out a clever CSS hack to
      // acheive this with vh units or something.
      var drawerHeight = $(window).outerHeight(true) - $globalNav.outerHeight(true);

      $mobileWrapper.add($drawers).each(function(index, el) {
        var $wrapper = $(el),
          origHeight = $wrapper.data('orig-height');

        if (isNaN(origHeight)) {
          origHeight = $wrapper.height();
          $wrapper.data('orig-height', origHeight);
        }

        if (origHeight < drawerHeight) {
          $wrapper.height(drawerHeight);
        }
      });
    }

  });

})(jQuery);
