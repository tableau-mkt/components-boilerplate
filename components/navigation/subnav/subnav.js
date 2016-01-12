/**
 * Sidebar nav  interaction including scroll-aware highlighting
 */

(function($){
  $(document).ready(function(){
    var $subnav = $('.subnav'),
        $links = $subnav.find('.subnav__links'),
        $linksWrapper = $links.find('.subnav__links-wrapper'),
        $anchors = $('.anchor-link');

    if ($links.length && $anchors.length) {
      $anchors.waypoint({
        handler: function(direction) {
          var id = this.element.id;
          if (direction === 'down') {
            $links.find('a[href="#' + id + '"]').parent().addClass('is-active').siblings().removeClass('is-active');
          } else if (direction === 'up') {
            $links.find('a[href="#' + id + '"]').parent().prev().addClass('is-active').siblings().removeClass('is-active');
          }
        },
        offset: $subnav.outerHeight(true)
      });

      // Handle scrolling of links on mobile
      mobileScroll();
      $(window).on('resize orientationchange', _.debounce(mobileScroll, 100));

      // Smooth Scroll for anchor links
      // @TODO generalize and separate from this component
      $links.find('a').click(function(e) {
        var element = $(this).attr('href'),
            offset = $subnav.outerHeight(true) - 1;

        // Offset for mobile
        if ($subnav.find(".sticky-wrapper").length) {
          offset = $subnav.find(".sticky-wrapper").outerHeight(true) - 1;
        }

        Tabia.smoothScrollTop($(element), 500, offset);
        e.preventDefault();
      });
    }

    // Manage scroll fading on mobile if there's overflow.
    function mobileScroll() {
      var width = $linksWrapper[0].offsetWidth,
          scrollWidth = $linksWrapper[0].scrollWidth;

      if (width < scrollWidth) {
        // Add right fade right away since we always start on the left.
        $links.addClass('fade-right');

        $linksWrapper.scroll(function () {
          var scrollPos = $linksWrapper.scrollLeft();

          // Add both fades and then remove below if needed.
          $links.addClass('fade-right fade-left');

          // Remove right fade when scrolled all the way to the right
          if (scrollPos === (scrollWidth - width)) {
            $links.removeClass('fade-right');
          }
          // Remove left fade when scrolled all the way to the left
          if (scrollPos === 0) {
            $links.removeClass('fade-left');
          }
        });
      } else {
        $links.removeClass('fade-left fade-right');
      }

    }
  });
})(jQuery);
