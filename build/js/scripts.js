var Tabia = Tabia || {};

Tabia.yo = function(content) {
  window.console && console.log(content || "Yo");
};

Tabia.later = function(func, time) {
  setTimeout(func, time || 2000);
};


/**
 * Smooth Scroll to top of an element
 * @param  {jQuery Object} $element - Element to scroll to the top of
 * @param  {integer} duration       - Length of the animation
 * @param  {integer} offset         - Any offset to account for sticky elements
 * @param  {boolean} onlyUp         - Whether scroll should only happen if the scroll direction is up
 */
function smoothScrollTop($element, duration, offset, onlyUp) {
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
}


/*
A re-implementation of jQuery's slideDown() and slideUp() that animates the
height of an element without requiring the use of display: none;

Helpful when needing to hide a video player while maintaining control via an
API.

The element must have "overflow: hidden;" set in CSS for this to work properly.
In order to have the element hidden by default, you mist also set "height: 0;"
in CSS as well.
*/

(function ( $ ) {
  $.fn.slideHeight = function(direction, options) {

    var $el = $(this),
        options = options || {duration: 400, easing: "swing"};

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
        function() {
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
}( jQuery ));


/**
 * General Brightcove video embed binding.
 *
 * This is a generic setup for in-page embedded players. We can bind a VideoJS wrapped object to a data property on the player DOM element, allowing us to control players by selecting the DOM element and accessing the bcPlayer data property. E.g.:
 *
 * $('#my-playerthing').data('bcPlayer').play();
 * $('#my-playerthing').data('bcPlayer').pause();
 *
 * A more complicated example that retrieves the full video metadata via the Brightcove catalog method:
 *
 * var $video = $('#my-player-object');
 *
 * $video.data('bcPlayer').catalog.getVideo($video.data('videoId'),
 * function(error, data) {
 *   // Do things with the return.
 *   console.log(data);
 * });
 *
 * This presumes that the Brightcove API script has been loaded on page.
 */
(function ($, window) {
  $(document).ready(function() {
    // Use the default Brightcove embed selector.
    var $players = $('.video-js');

    // Bail early if there aren't even any players.
    if (!$players.length || !typeof window.videojs === 'function') {
      return;
    }

    $players.each(function setupBrightcoveInstances() {
      var $this = $(this);

      // Pass in the DOM element, not the jQuery wrapped object.
      window.videojs($this[0]).ready(function prepareBrightcoveInstance() {
        $this.data('bcPlayer', this);
        $(document).trigger('brightcove:ready', $this.attr('id'));
      });
    });
  });
})(jQuery, window);
;
/** 
 * Content Reveal utility
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

(function ( $ ) {
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
          scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
          customAnimation = customAnimation || settings.animation;

      $trigger.data('revealState', 'open').addClass('open');
      if (hideText != "") {
        $trigger.text(hideText);
      }
      
      // Video players break when we display none so using a custom reimplementation
      // of slideDown. See helpers.js.
      $target.slideHeight('down', customAnimation);
      
      $curtain.slideUp(customAnimation);

      if (media == "video") {
        var videoObj = $target.find('.reveal-video--brightcove')[0],
            player = videojs(videoObj);

        setTimeout(function() {
          player.play();
        }, customAnimation.duration/2);
      }

      if ($curtain.length) {
        smoothScrollTop($curtain, customAnimation.duration, scrollOffset, true);
      }
    }

    // Hide the target content
    function hideContent(trigger) {
      var data = $(trigger).data(),
          $target = $('#' + data.revealTarget),
          $curtain = $('#' + data.revealCurtain),
          showText = data.revealShowText,
          media = data.revealMedia;

      $(trigger).data('revealState', 'closed').text(showText).removeClass('open');
      
      $target.slideHeight('up', settings.animation);
      
      $curtain.slideDown(settings.animation);

      if (media == "video") {
        var player = videojs($target.find('.reveal-video--brightcove')[0]);
        player.pause();
      }
    }

    // Hand-full of setup tasks
    function setup() {
      // Add reveal-state data
      settings.triggers.data('revealState', 'closed');
      
      settings.triggers.each(function(index, el) {
        var $target = $('#' + $(this).data('revealTarget')),
            showText = $(this).text();
        
        // Link content back to it's corresponding trigger
        $target.data('revealTrigger', $(this));

        // Save original trigger text
        settings.triggers.data('revealShowText', showText);
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

      // Add a close icon to each content continer
      if (settings.closeLink) {
        settings.contents.prepend($('<a href="#" class="reveal__close" href="#">&#9587;</a>'));
      }
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
}( jQuery ));
;
"use strict";

/**
 * jQuery Float Labels
 *
 * A simple plugin to enable the floating label pattern. It makes no attempt to
 * control any interactions of the label within js. It just binds to events as
 * needed and triggers configurable CSS classes.
 *
 * The jQuery method is called on the wrapper element that contains both the field
 * and the label. It might look like:
 *
 * <div class="field__wrapper">
 *   <label class="field__label" for="this-field">My Super Label</label>
 *   <input name="this-field">
 * </div>
 *
 * The javascript init, with options thrown in:
 * $('.field__wrapper').floatLabel({
 *   activeClass: 'activated',
 *   focusClass: 'zenified'
 * });
 */
(function ($) {
  $(document).ready(function () {

    // Set plugin method name and defaults
    var pluginName = 'floatLabel',
        defaults = {
          // In case you want to preserve labels as visible for no js, or old
          // IE users.
          wrapperInitClass: 'has-float-label',
          // For a custom label selector, if you have multiple labels, for some
          // reason.
          labelSelector: false,
          // Class given to label when its field has a non-null value. Toggled
          // when the value is empty / falsy.
          activeClass: 'is-active',
          // Class given to label when its field is focused. Toggled when it
          // loses focus.
          focusClass: 'has-focus'
        };

    // plugin constructor
    function Plugin (element, options) {
      var $element = $(element);

      // Set up internals for tracking, just in case.
      this._name = pluginName;
      this._defaults = defaults;
      this._element = $element;

      // Use the init options.
      this.options = $.extend(true, defaults, options);

      // Set up a couple of internals to keep track of input and label.
      this._wrapper = $element;
      this._input = this._findInput($element);
      this._label = this._findLabel($element);

      // Do it now.
      this.init();
    }

    // Utility: find a input that we want to alter the label for.
    Plugin.prototype._findInput = function(el) {
      var $textInputs = $(el).find('input, textarea').not('[type="checkbox"], [type="radio"]');
      // The regular text input types.
      if ($textInputs.length) {
        return $textInputs;
      }
      // Try for select elements.
      else {
        return $(el).find('select');
      }
    };

    // Utility: find a label in the field wrapper element.
    Plugin.prototype._findLabel = function(el) {
      // If a custom selector is provided
      if (this.options.labelSelector) {
        return $(el).find(this.options.labelSelector);
      }

      // Just try a label element.
      return $(el).find('label');
    };

    Plugin.prototype._onKeyUp = function (ev) {
      // On empty value, inactivate the label.
      if (this._input.val() === '') {
        this._label.removeClass(this.options.activeClass);
      }
      else {
        this._label.addClass(this.options.activeClass);
      }
      ev && ev.preventDefault();
    };

    Plugin.prototype._onFocus = function (ev) {
      this._label.addClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype._onBlur = function (ev) {
      this._label.removeClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype.init = function () {
      // Mark the element as having been init'ed.
      this._element.addClass(this.options.wrapperInitClass);

      // Event bindings to the input element.
      this._input.on('keyup change', $.proxy(this._onKeyUp, this));
      this._input.on('blur', $.proxy(this._onBlur, this));
      this._input.on('focus', $.proxy(this._onFocus, this));
    };

    // Lightweight constructor, preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
      return this.each(function initPlugin() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName,
          new Plugin(this, options));
        }
      });
    };

  });
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
    var settings = $.extend({
      tabLinks: $(this),
      animation: {
        duration: 1000,
        easing: "easeInOutQuart"
      }
    }, options);

    if (settings.tabLinks && settings.contents) {
      settings.tabLinks.on('click.tabs', function(e) {
        if (!$(this).hasClass('active')) {
          var $link = $(this),
              $content = $('#' + $link.data('tab-content')),
              $previousLink = $link.closest("ul").find('a.active'),
              $previousContent = $('#' + $previousLink.data('tab-content')),
              previousContentHeight = $previousContent.outerHeight(true),
              $flyoutContainer = $content.closest('.flyout__content'),
              $contentClone = $content.clone().show().css({"height":"auto"}).appendTo($content.parent()),
              contentHeight = $contentClone.outerHeight(true);

          $contentClone.remove();

          // Manage active class
          settings.tabLinks.add(settings.contents).removeClass('active');
          $link.add($content).addClass('active');

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
              height: flyoutHeight - parentPadding + heightChange,
            }, settings.animation);
          }
        }
        e.preventDefault();
      });
      
      if (settings.triggers) {
        settings.triggers.on('click.tabs-trigger', function(e) {
          var $link = settings.tabLinks.filter('[data-tab-content="' + $(this).data('tab-content') + '"]'),
              $content = $('#' + $(this).data('tab-content'));

          // Manage active class
          settings.tabLinks.add(settings.contents).removeClass('active');
          $link.add($content).addClass('active');
        });
      }
    }

    return this;
  } 
}( jQuery ));
;
$(document).ready(function () {
  $('input, select, textarea').not('[type="checkbox"], [type="radio"]').closest('.form-field__wrapper').floatLabel();
});
;
/**
 * Custom Accordion implementation.
 */

(function($){
  $(document).ready(function(){
    if ($(".accordion").length) {
      $(".accordion .accordion--item--content").not('.open .accordion--item--content').hide();

      $(".accordion .accordion--item--title").click( function(e) {
        var $t = $(this);
        $t.siblings(".accordion--item--content").slideToggle(250, 'linear');

        $t.parents(".accordion--item").toggleClass("open");
        if (!$t.closest('.accordion').find('.accordion-select-all').length) {
          $t.parents(".accordion--item").siblings().find('.accordion--item--content').slideUp(250, 'linear');
          $t.parents(".accordion--item").siblings().removeClass("open");
        }

        e.preventDefault();
      });
      
      // Auto-scroll and expand accordions when linked to with a hash
      var hash = window.location.hash;
      if ($(hash).length && $(hash).closest('.accordion--item').length) {
        $(hash).siblings('.field-collection-view').find('.accordion--item--title').trigger('click');   
      }
    }
  });
})(jQuery);
;
/** 
 * Context Switcher component
 */
(function($){
  var $triggers = $('.context-switcher__trigger'),
      $lists = $('.context-switcher__list'),
      animation = {
        duration: 500,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $lists.length) {
      // Run setup
      setup();


      $triggers.on('click.contextSwitcher', function(e) {
        var $trigger = $(this),
            $list = $trigger.closest('.context-switcher').find('.context-switcher__list');

        if ($trigger.hasClass('open')) {
          $list.slideUp(animation);
          $trigger.removeClass('open');
        } else {
          $list.slideDown(animation);
          $trigger.addClass('open');
        }
        e.preventDefault();
      });

      $lists.find('a').on('click.contextSwitcher', function(e) {
        var $option = $(this),
            $list = $option.closest('.context-switcher__list'),
            $trigger = $option.closest('.context-switcher').find('.context-switcher__trigger');

        $trigger.text($option.text());

        $list.slideUp(animation);
        $trigger.removeClass('open');

        $option.parent().addClass('selected').siblings().removeClass('selected');

        e.preventDefault();
      });
    }

  });

  // Hand-full of setup tasks
  function setup() {

  }

})(jQuery);
;
/** 
 * Flyout content utility
 */
(function($){
  var $triggers = $('.flyout__trigger'),
      $contents = $('.flyout__content'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $contents.length) {
      // Run setup
      setup();


      $triggers.on('click.flyout', function(e) {
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

  });

  // Show the target content
  function showContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.flyoutTarget),
        $parent = $target.offsetParent(),
        $slideout = $parent.find('.flyout__slideout'),
        parentPadding = $parent.outerHeight() - $parent.height(),
        offset = $('.sticky-wrapper .stuck').outerHeight(true);

    $target.data('flyoutState', 'open');

    // Adjust height of parent
    $parent.animate({
      height: $target.outerHeight(true) - parentPadding,
    }, animation);

    $slideout.add($target).animate({
      marginLeft: '-=100%',
    }, animation);

    smoothScrollTop($parent, animation.duration, offset, true);
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
    }, animation);

    $slideout.add($target).animate({
      marginLeft: '+=100%',
    }, animation);

    // Reset height of $parent to inherit in case of screen resizing that would 
    // need to adjust the height.
    setTimeout(function() {
      $parent.css('height', 'inherit');
    }, animation.duration + 1);
  }

  // Hand-full of setup tasks
  function setup() {
    // Add flyout-state data
    $contents.data('flyoutState', 'closed');
    
    // Link content back to it's corresponding trigger
    $triggers.each(function(index, el) {
      var $target = $('#' + $(this).data('flyoutTarget'));
      $target.data('flyoutTrigger', $(this));
    });

    // Set the relative parent to hide overflow
    $contents.each(function(index, el) {
      $(this).show();
      $(this).offsetParent().css('overflow', 'hidden');
    });
  }

})(jQuery);




/*******************************************************************************
 * HUGE CODE
*******************************************************************************/

function dataSourcesSearch() {
  var $dataSources = $('.data-sources-flyout'),
      $dataSearch = $dataSources.find('input[type=search]'),
      $dataItems,
      pattern,
      dataItemText;

  // While the user types look for matching terms
  $dataSearch.on('keyup', function(e){
    // Get the current search container bullet points
    $dataItems = $(this).parents('.data-sources-container').find('.data-sources-content li');

    // Go through each bullet point to make text with search
    $dataItems.each(function(){
      // Regex pattern to match any word
      pattern = new RegExp("(\\b" + $dataSearch.val() + "\\b)", "gim");

      // Get the text of each bullet point
      dataItemText = $(this).text();

      // Remove previous spans in bullet point text
      dataItemText = dataItemText.replace(/(<span>|<\/span>)/igm, "");

      // Add new span
      dataItemText = dataItemText.replace(pattern, "<span>$1</span>");

      // Update current data item text
      $(this)[0].innerHTML = dataItemText;
    });

  });

  };
/** 
 * Gif Player utility.
 */
(function($){
  var $gifs = $('.gif-player');
  
  $(document).ready(function(){
    if ($gifs.length) {
      $gifs.each(function(index, el) {
        var $gif = $(this);

        // Store the static image source
        $gif.data('static-src', $gif.attr('src'));

        // Lazy load in gifs so they start animating after brought into view.
        // Switch back to placeholder when image has exited view.
        // 
        // @todo store gif length in a data param and indicate when the gif is
        // being animated vs static. Add a replay button once the loop ends
        var inview = new Waypoint.Inview({
          element: $gif[0],
          entered: function(direction) {
            $gif.attr('src', $gif.data('gif-src'));
          },
          exited: function(direction) {
            $gif.attr('src', $gif.data('static-src'));
          }
        });
        
      });
    }
  });
})(jQuery);
;
(function($){
  $(document).ready(function(){
    var $heroSlideShow = $('.hero-slideshow');

    if($heroSlideShow) {
      $heroSlideShow.slick({
        dots: true,
        arrows: true,
        speed: 650,
        easing: "easeInOutQuart",
        slide: '.hero-slideshow__slide',
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
          {
            breakpoint: 639,
            settings: {
              adaptiveHeight: true,
            }
          }
        ]
      });
    }
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
 * Search Highlight utility.
 *
 * Searches through a list of items and highlights items that match the term.
 */
(function($){
  var $searches = $('.search-highlight');
  
  $(document).ready(function(){
    if ($searches.length) {
      $searches.each(function(index, el) {
        var $search = $(el),
            $content = $('#' + $search.data('content')),
            highlightClass = $search.data('highlight-class') + " search-highlight__match",
            $contentItems = $content.find('li');

        $search.on('change paste keyup search', function(e) {
          var term = $(this).val().toLowerCase();
          $contentItems.each(function(index, item) {
            var text = $(item).text().toLowerCase();
            $(item).removeClass(highlightClass);
            if (term.length > 0 && text.indexOf(term) > -1) {
              $(item).addClass(highlightClass);
            }
          });
        });

      });
    }
  });
})(jQuery);
;
/**
 * Social share handling
 *
 * This is a simple hover based reveal for the social share display.
 */
(function ($, window) {
  $(document).ready(function () {
    var $socialShare = $('.social-share__wrapper');

    // Bail early if there aren't even any element.
    if (!$socialShare.length) {
      return;
    }

    // Utilize the slideHeight custom animation.
    // @TODO change this out to contentReveal, would likely involve refactor.
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
;
(function($){
  $(document).ready(function(){

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      stickIt(this);
    });

    if (matchMedia('(min-width: 961px)').matches) {
      $('.sticky--desktop').each(function(i) {
        stickIt(this);
      });
    }

    if (matchMedia('(max-width: 960px) and (min-width: 640px)').matches) {
      $('.sticky--tablet').each(function(i) {
        stickIt(this);
      });
    }

    if (matchMedia('(max-width: 639px)').matches) {
      $('.sticky--mobile').each(function(i) {
        stickIt(this);
      });
    }

  });

  function stickIt(el) {
    var sticky = new Waypoint.Sticky({
      element: el
    });
  }
})(jQuery);
;
/** 
 * Tabs component interaction
 * See jquery.tabs.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.tabs__tab-link').tabs({
      contents: $('.tabs__tab-content'),
      triggers: $('.tabs__tab-trigger')
    });
  });
}( jQuery ));
;
(function($){
  var $vizSlideshow = $('.viz-slideshow__slides');

  $(document).ready(function(){
    if ($vizSlideshow.length) {
      $vizSlideshow.slick({
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 1,
        arrows: true,
        speed: 650,
        easing: "easeInOutQuart",
        slide: '.viz-slideshow__slide',
        prevArrow: $(this).find('.viz-slideshow__arrow--prev'),
        nextArrow: $(this).find('.viz-slideshow__arrow--next'),
        responsive: [
          {
            breakpoint: 940,
            settings: {
              centerPadding: '50px'
            }
          },
          {
            breakpoint: 639,
            settings: {
              centerPadding: '25px',
              arrows: false,
              prevArrow: false,
              nextArrow: false
            }
          }
        ]
      });
    }
  });
})(jQuery);
;
/**
 * Brightcove video chapter handling.
 *
 * This handles chaptering interaction given an expected DOM structure. E.g.:
 * <ul class="video__chapters" data-chapters-for="[VIDEO DOM ID]">
 *   <li class="video__chapter" data-timestamp="60">Something</li>
 *   <li class="video__chapter" data-timestamp="120">Something else</li>
 * </ul>
 *
 * It listens for a brightcove:ready event that is raised per video instance as
 * it successfully creates a Brightcove videojs wrapped player object.
 */
(function ($, window) {
  $(document).ready(function () {
    var $chapterLists = $('[data-chapters-for]');

    // Bail early if there aren't even any lists of chapters.
    if (!$chapterLists.length || !typeof window.videojs === 'function') {
      return;
    }

    // Utilize the revealContent plugin.
    $chapterLists.each(function initChapterReveal() {
      $(this).contentReveal({
        triggers: $(this).next('.video-chapters__toggle-wrapper').find('.video-chapters__toggle'),
        closeLink: false
      });
    });

    // The Brightcove player binding is async. We wait for a raised event first
    // before binding the video chapter actions.
    $(document).on('brightcove:ready', function (e, data) {
      // The 'data' received here is the id attribute of the video player element.
      var $readyChapters = $chapterLists.filter('[data-chapters-for="' + data + '"]'),
          $videoElement = $('#' + data),
          BCPlayer = $videoElement.data('bcPlayer');

      // Bail early.
      if (!$readyChapters.length) {
        return;
      }

      $readyChapters.find('.video-chapters__chapter').on('click.chapter', function triggerVideoChapter (e) {
        var $this = $(this),
            timestamp = $this.data('timestamp');

        e.preventDefault();

        // Set the play time.
        BCPlayer.currentTime(timestamp);

        // Scroll.
        smoothScrollTop($videoElement);

        // Play the video if it ain't playing.
        if (BCPlayer.paused()) {
          BCPlayer.play();
        }
      });
    });

  });
})(jQuery, window);
;
/** 
 * Global gavigation interactions
 */
(function($){
  var $globalNav = $('.global-nav__top'),
      $menu = $globalNav.find('.global-nav__primary-menu'),
      $expandableLinks = $menu.find('li.expandable'),
      $drawers = $('.global-nav__drawers__drawer'),
      $hamburger = $globalNav.find('.hamburger'),
      $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
      $mobileDrawerClose = $('.global-nav__drawers__drawer__close'),
      animation = {
        duration: 750,
        easing: "easeInOutQuart"
      };

  $(document).ready(function(){
    
    /* Desktop stuff */
    if (matchMedia('(min-width: 961px)').matches) {
      // Drawer Expanding interaction
      // @todo needs lots of work here.
      
      var throttle = _.throttle(function($link) {
        openDrawer($link);
      }, animation.duration);

      $expandableLinks.hover( 
        function() {
          throttle($(this));
        }, function() {
          var $link = $(this);
              $hoverElements = $globalNav.closest('.global-nav').siblings(),
              $navLinks = $globalNav.find('a').not($link.find('a'));

          $hoverElements.add($navLinks).hover(function() {
            closeDrawer($link);
          });
        }
      );

      $drawers.click(function(e) {
        e.stopPropagation();
      });
    }

    /* Tablet/mobile stuff */ 
    if (matchMedia('(max-width: 960px)').matches) {

      // Set the height of the dropdown content
      mobileHeightAdjust()
      
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


  });

  function openDrawer($link) {
    var $drawer = $drawers.filter('#' + $link.data('drawer-id'));

    if (!$drawers.hasClass('expanded')) {
      $link.add($drawer).addClass('expanded');
      $drawers.filter('#' + $link.data('drawer-id')).slideDown(animation);
    }
  }

  function closeDrawer($link) {
    var $drawer = $drawers.filter('#' + $link.data('drawer-id'));

    if ($drawer.hasClass('expanded')) {
      $link.add($drawer).removeClass('expanded');
      $drawers.filter('#' + $link.data('drawer-id')).slideUp(animation);
    }
  }

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

})(jQuery);
;
/** 
 * Global search bar interaction
 */
(function($){
  $(document).ready(function(){
    var $search = $('.global-nav__search'),
        $closeSearch = $search.find('.global-nav__search__close'),
        availableTags = [
          "Tableau",
          "Desktop",
          "Server",
          "Online",
          "Cloud",
          "Public",
          "Reader",
          "Business Intelligence",
          "Data",
          "Products",
          "Graphs",
          "Visualizations"
        ];

    $search.on('click', function(e){
      e.preventDefault();
      $(this).parents('.global-nav__top').addClass('global-nav--search-shown');
    });

    $closeSearch.on('click', function(e){
      e.stopPropagation();
      e.preventDefault();
      $search.parents('.global-nav__top').removeClass('global-nav--search-shown');
    });
    
    // Search auto-complete for demo purposes. Requires jQuery UI Autocomplete
    // @todo add support for highlighting the searched characters in the list
    //    http://stackoverflow.com/questions/2435964/jqueryui-how-can-i-custom-format-the-autocomplete-plug-in-results
    $search.find("input").autocomplete({
      source: availableTags,
      appendTo: ".global-nav"
    });

  });
})(jQuery);
;
/** 
 * Hamburger interaction interactions
 */
(function($){
  var $hamburger = $('.hamburger');
  $(document).ready(function(){
    if ($hamburger.length) {
      $hamburger.on('click.hamburger', function(e) {
        $(this).toggleClass('hamburger--open');
        e.preventDefault();
      });
    }
  });
})(jQuery);
;
/**
 * Sidebar nav  interaction including scroll-aware highlighting
 */

(function($){
  var $nav = $('.subnav__links'),
      $anchors = $('.anchor');

  $(document).ready(function(){
    if ($nav.length && $anchors.length) {
      $anchors.waypoint({
        handler: function(direction) {
          var id = this.element.id;
          if (direction === 'down') {
            $nav.find('a[href=#' + id + ']').parent().addClass('active').siblings().removeClass('active');
          } else if (direction === 'up') {
            $nav.find('a[href=#' + id + ']').parent().prev().addClass('active').siblings().removeClass('active');
          }
        },
        offset: $('.subnav').outerHeight(true)
      });
    }

    // Smooth Scroll for anchor links
    // @TODO generalize and separate from this component
    $nav.find('a').click(function(e) {
      var element = $(this).attr('href'),
          offset = $('.subnav').outerHeight(true) - 1;

      smoothScrollTop($(element), 500, offset);
      e.preventDefault();
    });
    
  });
})(jQuery);
;
/** 
 * Topic Navigation interaction
 * Requires jquery.contentReveal.js and jquery.tabs.js
 */

(function ( $ ) {
  $(document).ready(function() {
    // Tabs integration
    $('.topic-nav__tabs a').tabs({
      contents: $('.topic-nav__drawer')
    });

    // contentReveal interaction
    $('.topic-nav__drawers').contentReveal({
      triggers: $('.topic-nav__toggle'),
      closeLink: false
    });

    // Custom tweaks
    $('.topic-nav__toggle').on('click.topic-nav', function(e) {
      var $parentNav = $(this).closest('.topic-nav');

      if ($(this).data('revealState') == 'open') {
        $parentNav.find('.topic-nav__tabs a').eq(0).trigger('click').addClass('active');
      } else {
        $parentNav.find('.topic-nav__tabs a').removeClass('active');
      }
    });

    $('.topic-nav__tabs a').on('click.topic-nav', function(e) {
      var $toggle = $(this).closest('.topic-nav').find('.topic-nav__toggle');
      
      if ($toggle.data('revealState') == 'closed') {
        $toggle.trigger('click.reveal');
      }
    });

  });
}( jQuery ));
