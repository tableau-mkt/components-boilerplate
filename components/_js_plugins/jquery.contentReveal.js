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
    var hasVideoJs = typeof window.videojs === 'function',
        // Default settings
        settings = $.extend({
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
          expandToggle = data.revealExpandToggle,
          $videoJs = $target.find('.video-js');

      customAnimation = customAnimation || settings.animation;

      $trigger.data('revealState', 'open').addClass('is-open');
      if (hideText != "") {
        $trigger.text(hideText);
      }

      // Swap content.
      // NOTE: Video players break via display:none, thus custom function.
      $curtain.slideHeight('up', customAnimation);
      $target.slideHeight('down', customAnimation);

      if (media === 'video') {
        // Bail unless videojs is available and this is a videojs embedded video.
        if (!hasVideoJs || !$videoJs.length) {
          return;
        }

        setTimeout(function () {
          // Get videojs instance and play the video.
          videojs($videoJs[0]).play();
        }, customAnimation.duration/2);
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
          expandToggle = data.revealExpandToggle,
          $videoJs = $target.find('.video-js'),
          player;

      $trigger.data('revealState', 'closed').removeClass('is-open');

      if (typeof showText !== 'undefined') {
        $trigger.text(showText);
      }

      // Swap content.
      $target.slideHeight('up', settings.animation);
      $curtain.slideHeight('down', settings.animation);

      if (media === 'video') {
        // Bail unless videojs is available and this is a videojs embedded video.
        if (!hasVideoJs || !$videoJs.length) {
          return;
        }

        // Get videojs instance and pause the video.
        videojs($videoJs[0]).pause();
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

      if (hash.length && settings.contents.is(hash)) {
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
