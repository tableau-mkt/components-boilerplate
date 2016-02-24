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
        if (!$(this).hasClass('is-active')) {
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
