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
