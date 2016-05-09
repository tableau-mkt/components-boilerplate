/**
 * Components Utility Functions
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.utils = {};

// Breakpoint values.
Components.utils.breakpoints = {
  mobileMax: 639,
  tabletMin: 640,
  tabletMax: 960,
  desktopMin: 961,
  contentMax: 1550,
  layoutMax: 1920
};

/**
 * Smooth Scroll to top of an element
 * @param  {jQuery Object} $element - Element to scroll to the top of
 * @param  {integer} duration       - Length of the animation
 * @param  {integer} offset         - Any offset to account for sticky elements
 * @param  {boolean} onlyUp         - Whether scroll should only happen if the scroll direction is up
 */
Components.utils.smoothScrollTop = function ($element, duration, offset, onlyUp) {
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
};

/**
 * Get parsed URL params, with caching.
 *
 * @return {Object} URL Params
 */
Components.utils.getUrlParams = function () {
  var urlParams = Components.utils.parseUrlParams;
  // Return the cached result, or on cache miss, the result of the invoked
  // function, assigned to the cache property of this Function object.
  return urlParams.cache || (urlParams.cache = urlParams());
};

/**
 * Get parsed URL params.
 *
 * @return {Object} URL Params
 */
Components.utils.parseUrlParams = function () {
  var result = {},
    match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
    query = window.location.search.substring(1);

  while ((match = search.exec(query)) !== null) {
    result[decode(match[1])] = decode(match[2]);
  }

  return result;
};


/**
 * Helper to identify which breakpoint the browser is in.
 * @param  {string} layout - the layout mode to check for.
 * @return {Boolean} whether viewport is within specified breakpoint
 * @example Components.utils.breakpoint('mobile') - true if in mobile layout
 */
Components.utils.breakpoint = function (layout) {
  // Fail fast if matchMedia isn't present.
  if (typeof window.matchMedia !== 'function') {
    return false;
  }

  switch (layout) {
    case 'mobile':
      return matchMedia('(max-width: ' + Components.utils.breakpoints.mobileMax + 'px)').matches;
      break;
    case 'tablet':
      return matchMedia('(min-width:' + Components.utils.breakpoints.tabletMin + 'px) and (max-width: ' + Components.utils.breakpoints.tabletMax + 'px)').matches;
      break;
    case 'desktop':
      return matchMedia('(min-width: ' + Components.utils.breakpoints.desktopMin + 'px)').matches;
      break;
    default:
      return false;
  }
};

/**
 * Helper function to get the element's viewport center.
 * @param $element
 *
 * @returns string
 *  y position
 */
Components.utils.getElementViewPortCenter = function ($element) {
  var scrollTop = $(window).scrollTop(),
    scrollBot = scrollTop + $(window).height(),
    elHeight = $element.outerHeight(),
    elTop = $element.offset().top,
    elBottom = elTop + elHeight,
    elTopOffset = elTop < scrollTop ? scrollTop - elTop : 0,
    elBottomOffset = elBottom > scrollBot ? scrollBot - elTop : elHeight;

  // Return 50% if entire element is visible.
  if (elTopOffset === 0 && elBottomOffset === elHeight) {
    return '50%';
  }

  return Math.round(elTopOffset + ((elBottomOffset - elTopOffset) / 2)) + 'px';
}
;
/**
 * Content Flyout utility.
 *
 * Set up a content region that is hidden by default and "flies out" from the
 * right side of the page when a trigger is clicked.
 *
 * Options:
 *   triggers - Required - [jQuery Ojbect] - element(s) to be used as a trigger
 *   contents - Optional - [jQuery Object] - element(s) to use as content wrapper
 *   animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *  $('.flyout-content-wrapper').contentFlyout({
 *    triggers: $('.triggers-selector')
 *  });
 */

(function ($) {
  $.fn.contentFlyout = function(options) {
    // Default settings
    var settings = $.extend({
      contents: $(this),
      animation: {
        duration: 1000,
        easing: "easeInOutQuart"
      }
    }, options);

    if (settings.triggers.length && settings.contents.length) {
      // Run setup
      setup();

      settings.triggers.on('click.flyout', function(e) {
        var trigger = this,
        $target = $('#' + $(trigger).data('flyoutTarget')),
        state = $target.data('flyoutState');

        if (state == 'closed') {
          setTimeout(function() {
            showContent(trigger);
          }, 1);
        } else if (state == 'open') {
          hideContent(trigger);
        }
        e.preventDefault();
      });

      $('.flyout__close-link').on('click.flyout', function(e) {
        $(this).closest('.flyout__content').data('flyoutTrigger').trigger('click.flyout');
        e.preventDefault();
      });
    }

    // Show the target content
    function showContent(trigger) {
      var data = $(trigger).data(),
      $target = $('#' + data.flyoutTarget),
      $parent = $target.offsetParent(),
      $slideout = $parent.find('.flyout__slideout'),
      parentPadding = $parent.outerHeight() - $parent.height(),
      offset = $('.sticky-wrapper .stuck').outerHeight(true),
      scrollDown = data.flyoutScrollDown ? true : false;

      $target.data('flyoutState', 'open');

      // Adjust height of parent
      $parent.animate({
        height: $target.outerHeight(true) - parentPadding,
      }, settings.animation);

      $slideout.add($target).animate({
        marginLeft: '-=100%',
      }, settings.animation);

      Components.utils.smoothScrollTop($parent, settings.animation.duration, offset, !scrollDown);
    }

    // Hide the target content
    function hideContent(trigger) {
      var data = $(trigger).data(),
      $target = $('#' + data.flyoutTarget),
      $parent = $target.offsetParent(),
      $slideout = $parent.find('.flyout__slideout'),
      slideoutHeight = $slideout.outerHeight(true);

      $target.data('flyoutState', 'closed');

      // Adjust height of parent
      $parent.animate({
        height: slideoutHeight,
      }, settings.animation);

      $slideout.add($target).animate({
        marginLeft: '+=100%',
      }, settings.animation);

      // Reset height of $parent to inherit in case of screen resizing that would
      // need to adjust the height.
      setTimeout(function() {
        $parent.css('height', 'inherit');
      }, settings.animation.duration + 1);
    }

    // Hand-full of setup tasks
    function setup() {
      // Add flyout-state data
      settings.contents.data('flyoutState', 'closed');

      // Link content back to it's corresponding trigger
      settings.triggers.each(function(index, el) {
        var $target = $('#' + $(this).data('flyoutTarget'));
        $target.data('flyoutTrigger', $(this));
      });

      // Set the relative parent to hide overflow
      settings.contents.each(function(index, el) {
        $(this).show();
        $(this).offsetParent().css('overflow', 'hidden');
      });
    }

    return this;
  }
})(jQuery);
;
/**
 * Content Reveal utility.
 *
 * Set a wrapper around content as a revealable region. Assign a "trigger"
 * element as the toggle to expand and collapse the content region.
 *
 * Options:
 *   triggers - Required - [jQuery Ojbect] - element(s) to be used as a trigger
 *   contents - Optional - [jQuery Object] - element(s) to use as content wrapper
 *   closeLink - Optional - [boolean] - whether a close link should be added
 *   animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *  $('.contents-wrapper-selector').contentReveal({
 *    triggers: $('.triggers-selector')
 *  });
 *
 * @TODO: Can still use some cleanup and work to be a more agnostic plugin
 */

(function ($) {
  $.fn.contentReveal = function(options) {
    // Default settings
    var settings = $.extend({
      contents: $(this),
      closeLink: true,
      animation: {
        duration: 1000,
        easing: "easeInOutQuart"
      }
    }, options);

    if (settings.triggers) {
      // Run setup
      setup();

      settings.triggers.on('click.reveal', function(e) {
        var state = $(this).data('revealState');

        if (state == 'closed') {
          showContent(this);
        } else if (state == 'open') {
          hideContent(this);
        }
        e.preventDefault();
      });

      $('.reveal__close').on('click.reveal', function(e) {
        hideContent($(this).parent('.reveal__content').data('revealTrigger'));
        e.preventDefault();
      });

      // Trigger auto-reveal
      autoReveal();
    }

    // Show the target content
    function showContent(trigger, customAnimation) {
      var data = $(trigger).data(),
          $trigger = $(trigger),
          $target = $('#' + data.revealTarget),
          $curtain = $('#' + data.revealCurtain),
          hideText = data.revealHideText,
          type = data.revealType,
          media = data.revealMedia,
          scrollBehavior = data.revealScroll,
          $scrollTarget,
          scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
          expandToggle = data.revealExpandToggle;

      customAnimation = customAnimation || settings.animation;

      $trigger.data('revealState', 'open').addClass('is-open');
      if (hideText != "") {
        $trigger.text(hideText);
      }

      // Swap content.
      // NOTE: Video players break via display:none, thus custom function.
      $curtain.slideHeight('up', customAnimation);
      $target.slideHeight('down', customAnimation);

      if (media == "video") {
        var videoObj = $target.find('.video-js')[0],
            player = videojs(videoObj);

        setTimeout(function() {
          // Ensure player is ready before calling .play()
          player.ready(function () {
            player.play();
          });
        }, customAnimation.duration / 2);
      }

      // Scroll when reveal is clicked open.
      if (scrollBehavior) {
        switch (scrollBehavior) {
          case 'trigger':
            $scrollTarget = $trigger;
            break;
          case 'target':
            $scrollTarget = $target;
            break;
          default:
            $scrollTarget = $('#' + scrollBehavior);
            break;
        }
        Components.utils.smoothScrollTop($scrollTarget, customAnimation.duration, scrollOffset, false);
      }
      else if ($curtain.length) {
        // Use curtain for scroll.
        Components.utils.smoothScrollTop($curtain, customAnimation.duration, scrollOffset, true);
      }

      // Special expand icon handling
      if (expandToggle) {
        $trigger.addClass('link--collapse').removeClass('link--expand');
      }
    }

    // Hide the target content
    function hideContent(trigger) {
      var $trigger = $(trigger),
          data = $trigger.data(),
          $target = $('#' + data.revealTarget),
          $curtain = $('#' + data.revealCurtain),
          showText = data.revealShowText,
          media = data.revealMedia,
          expandToggle = data.revealExpandToggle;

      $trigger.data('revealState', 'closed').removeClass('is-open');

      if (typeof showText !== 'undefined') {
        $trigger.text(showText);
      }

      // Swap content.
      $target.slideHeight('up', settings.animation);
      $curtain.slideHeight('down', settings.animation);

      if (media == "video") {
        var player = videojs($target.find('.video-js')[0]);
        player.pause();
      }

      // Special expand icon handling
      if (expandToggle) {
        $trigger.addClass('link--expand').removeClass('link--collapse');
      }
    }

    // Hand-full of setup tasks
    function setup() {
      // Add reveal-state data
      settings.triggers.data('revealState', 'closed');

      // Add a close icon to each content continer
      if (settings.closeLink) {
        settings.contents.prepend($('<a href="#" class="reveal__close" href="#"><i class="icon icon--close-window-style2"></i></a>'));
      }

      settings.triggers.each(function(index, el) {
        var $trigger = $(this),
            $target = $('#' + $trigger.data('revealTarget')),
            showText = $trigger.text();

        // Link content back to it's corresponding trigger
        $target.data('revealTrigger', $trigger);

        // Special handling for links with an expand icon.
        if ($trigger.hasClass('link--expand')) {
          $trigger.data('revealExpandToggle', true);
        }

        // Save original trigger text
        if (typeof $trigger.data('revealHideText') !== 'undefined') {
          settings.triggers.data('revealShowText', showText);
        }

        // Remove close link if the data attribute is set to false.
        if (settings.closeLink && $trigger.data('revealCloseLink') === false) {
          $target.find('.reveal__close').remove();
        }
      });

      // // Set initial margin on content if there is a curtain
      // // @TODO this is for naimating the reveal as if the content is
      // // stationary and the elements above and below are revealing it.
      // // Currently, the content moves up as the curtain slides up.
      // settings.contents.each(function(index, el) {
      //   var data = $($(this).data('revealTrigger')).data(),
      //       $curtain = $("#" + data.revealCurtain);

      //   if ($curtain.length) {
      //     $(this).css('margin-top', -$curtain.outerHeight(true));
      //   }
      // });
    }

    function autoReveal() {
      var hash = window.location.hash;

      // If the hash exists (e.g. #something) and it matches using jQuery selection.
      if (hash.length > 1 && settings.contents.is(hash)) {
        var $trigger = $(hash).data('revealTrigger');

        // Prevent scrolling to the anchor...
        setTimeout(function() {
          window.scrollTo(0, 0);
        }, 1);

        showContent($trigger, {duration: 0});
      }
    }

    return this;
  }
})(jQuery);
;
/**
 * A re-implementation of jQuery's slideDown() and slideUp() that animates the
 *  height of an element without requiring the use of display: none;
 *
 *  Helpful when needing to hide a video player while maintaining control via an
 *  API.
 *
 *  This function enforces "overflow: hidden" in order to work properly.
 *  To hide the element by default, set "height: 0" in CSS as well.
 */

(function ($) {

  $.fn.slideHeight = function (direction, options) {
    var $el = $(this);

    options = options || {duration: 400, easing: "swing"};

    // Enforce height zero.
    $el.css('overflow', 'hidden');

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
      $el.animate({
        height: 0
      }, options);
    }

    return this;
  };

})(jQuery);
;
/**
 * Tabs content utility
 *
 * Create interactive tabs that switch between different visible content when
 * tabs are clicked.
 *
 * Options:
 *   contents - Required - [jQuery Object] - element(s) to use as content wrapper
 *   tabLinks - Optional - [jQuery Ojbect] - element(s) to be used as a trigger
 *   wrapper  - Optional - [jQuery Object] - Wrapping element around contents
 *     and tabLinks. This defaults to .tabs__wrapper, but may be overidden for
 *     specific cases.
 *   triggers - Optional - [jQuery Object] - additional elements (other than tabs)
 *     used for triggering the display of specific tabs
 *   animation - Optional - [object] - animation settings for expanding/collapsing
 *
 * Usage:
 *   $('.tab-links-selector').tabs({
 *     contents: $('.tab-contents-wrapper-selector'),
 *     triggers: $('.tab-triggers-selector')
 *   });
 *
 * @TODO: Can still use some cleanup and work to be a more agnostic plugin
 */

(function ( $ ) {
  $.fn.tabs = function(options) {
    // Default settings
    var settings = $.extend(true, {
      tabLinks: $(this),
      wrapper: $('.tabs__wrapper'),
      animation: {
        duration: 1000,
        easing: "easeInOutQuart"
      }
    }, options);

    if (settings.tabLinks.length && settings.contents.length) {
      settings.tabLinks.on('click.tabs', function(e) {
        var $link = $(this),
            $content = $('#' + $link.data('tab-content')),
            $wrapper = $link.closest(settings.wrapper),
            $tabLinks = $wrapper.find(settings.tabLinks),
            $previousLink = $link.closest("ul").find('a.is-active'),
            $previousContent = $('#' + $previousLink.data('tab-content')),
            previousContentHeight = $previousContent.outerHeight(true),
            $flyoutContainer = $content.closest('.flyout__content'),
            $contentClone = $content.clone().show().css({"height":"auto"}).appendTo($content.parent()),
            contentHeight = $contentClone.outerHeight(true),
            scrollBehavior = $wrapper.data('tabs-scroll'),
            scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
            $scrollTarget;

        $contentClone.remove();

        if (!$(this).hasClass('is-active')) {
          // Manage active class
          $tabLinks.add($wrapper.find(settings.contents)).removeClass('is-active');
          $link.add($content).addClass('is-active');

          // Animate the height transition between tabs
          $content.height(previousContentHeight).animate({
            height: contentHeight,
          }, settings.animation);

          // Manage flyout container if tabs are within a flyout
          if ($flyoutContainer.length) {
            var $parent = $flyoutContainer.offsetParent(),
                parentPadding = $parent.outerHeight() - $parent.height(),
                flyoutHeight = $flyoutContainer.outerHeight(true),
                heightChange = contentHeight - previousContentHeight;

            // Adjust height of parent
            $parent.animate({
              height: flyoutHeight - parentPadding + heightChange
            }, settings.animation);
          }
        }

        // Handling scrolling behaviors
        if (scrollBehavior) {
          switch (scrollBehavior) {
            case 'wrapper':
              $scrollTarget = $wrapper;
              break;
            case 'content':
              $scrollTarget = $content;
              break;
            default:
              $scrollTarget = $('#' + scrollBehavior);
              break;
          }
          Components.utils.smoothScrollTop($scrollTarget, settings.animation.duration, scrollOffset, false);
        }

        e.preventDefault();
      });

      if (settings.triggers) {
        settings.triggers.on('click.tabs-trigger', function(e) {
          var $link = settings.tabLinks.filter('[data-tab-content="' + $(this).data('tab-content') + '"]'),
              $content = $('#' + $(this).data('tab-content')),
              $wrapper = $link.closest(settings.wrapper),
              $tabLinks = $wrapper.find(settings.tabLinks);

          // Manage active class
          $tabLinks.add($wrapper.find(settings.contents)).removeClass('is-active');
          $link.add($content).addClass('is-active');
        });
      }
    }

    return this;
  }
}( jQuery ));
;
/**
 * Custom Accordion implementation.
 */

(function($){
  $(document).ready(function(){
    var $accordion = $('.accordion'),
        animation = {
          duration: 400,
          easing: "easeInOutQuart"
        };

    if (!$accordion.length) {
      return;
    }

    $('.accordion .accordion__content').not('.open .accordion__content').hide();
    $('.accordion .accordion__title').click( function(e) {
      var $this = $(this),
          $openItems = $this.parent().siblings('.open');

      // Close other open items.
      $openItems.find('.accordion__content').slideToggle(animation);
      $openItems.toggleClass('open');

      // Open new item.
      $this.siblings('.accordion__content').slideToggle(animation);
      $this.parents('.accordion__item').toggleClass('open');

      e.preventDefault();
    });

    // Auto-scroll and expand accordions when linked to with a hash
    var hash = window.location.hash;
    if ($(hash).length && $(hash).closest('.accordion__item').length) {
      $(hash).parents('.accordion__title').trigger('click');
    }
  });
})(jQuery);
;
/**
 * Flyout content component interaction
 * See jquery.contentFlyout.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.flyout__content').contentFlyout({
      triggers: $('.flyout__trigger')
    });
  });
}( jQuery ));
;
(function($) {
  $(document).ready(function() {

    /**
     * Handles closing the notification.
     */
    $('.global-notification .global-notification__close').click(function (e) {
      e.preventDefault();

      $('.global-notification').slideUp();
    });
  });
})(jQuery);
;
/** 
 * Reveal content component interaction
 * See jquery.contentReveal.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.reveal__content').contentReveal({
      triggers: $('.reveal__trigger')
    });
  });
}( jQuery ));
;
/**
 * Tabs component interaction
 * See jquery.tabs.js for details
 */

(function ( $ ) {
  $(document).ready(function() {
    $('.tabs__tab-link').tabs({
      contents: $('.tabs__tab-content'),
      triggers: $('.tabs__tab-trigger')
    });
  });
}( jQuery ));
;
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
;
/**
 * Hamburger interaction interactions
 */
(function($){
  $(document).ready(function(){
    var $hamburger = $('.hamburger');

    if ($hamburger.length) {
      $hamburger.on('click.hamburger', function(e) {
        $(this).toggleClass('hamburger--open');
        e.preventDefault();
      });
    }
  });
})(jQuery);
