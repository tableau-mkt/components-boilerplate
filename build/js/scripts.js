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
    $('body,html').animate({
      scrollTop: elementTop - offset
    }, duration);
  }
}

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
      $expandableLinks.hover( 
        function() {
          openDrawer($(this));
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

    $link.add($drawer).addClass('expanded');
    $drawers.filter('#' + $link.data('drawer-id')).slideDown(animation);
  }

  function closeDrawer($link) {
    var $drawer = $drawers.filter('#' + $link.data('drawer-id'));

    $link.add($drawer).removeClass('expanded');
    $drawers.filter('#' + $link.data('drawer-id')).slideUp(animation);
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
    var drawerHeight = $(window).outerHeight(true) - $globalNav.outerHeight(true);


console.log("TEST");


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

})(jQuery);;
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
(function($){
  $(document).ready(function(){
    var $heroSlideShow = $('.hero-slideshow');

    // Initialize hero carousel
    function init() {
      if($heroSlideShow) {
        $heroSlideShow.slick({
          dots: true,
          arrows: false,
          speed: 650,
          easing: "easeInOutQuart",
          slide: '.hero-slideshow__slide',
          responsive: [
            {
              breakpoint: 639,
              settings: {
                adaptiveHeight: true,
              }
            }
          ]
        });

        slideShowNavigation();
      }
    }

    function slideShowNavigation() {
      var $slides = $heroSlideShow.find('.hero-slideshow__slide').not('.slick-cloned'),
          count = $slides.length,
          slidesID = [],
          slideHoverText = [],
          slideHoverClass = [],
          $arrowLeft,
          $arrowRight,
          next,
          prev,
          arrowRightInverted,
          arrowLeftInverted;

      // Get slide navigation values from the dom
      for(var k=0; k < count; k++) {
        slidesID.push($($slides[k]).attr('id'));
        slideHoverText.push($($slides[k]).data('title'));
        slideHoverClass.push($($slides[k]).data('title-class'));
      }

      // Update slide navigation dom
      for(var i=0; i < count; i++) {
        $arrowLeft = $slides.eq(i).find('.hero-slideshow__arrow--left');
        $arrowRight = $slides.eq(i).find('.hero-slideshow__arrow--right');
        next = i+1;
        prev = i-1;
        arrowLeftInverted = '';
        arrowRightInverted = '';

        // Account for looping
        if(prev === -1) {
          prev = count -1;
        }

        if(next === count) {
          next = 0;
        }

        if(slideHoverClass[prev].match('inverted')) {
          arrowLeftInverted = 'inverted';
        }

        if(slideHoverClass[next].match('inverted')) {
          arrowRightInverted = 'inverted';
        }

        // Add class and text to the arrows
        $arrowLeft.addClass(arrowLeftInverted)
            .find('.hero-slideshow__arrow__title')
            .addClass(slideHoverClass[prev])
            .html(slideHoverText[prev]);
        
        $arrowRight.addClass(arrowRightInverted)
            .find('.hero-slideshow__arrow__title')
            .addClass(slideHoverClass[next])
            .html(slideHoverText[next]);
      }

      slideShowNavigationEvents();
    }

    // Next and previous arrow integration with slick
    function slideShowNavigationEvents() {

      $('.hero-slideshow__arrow--right').click(function(e) {
        e.preventDefault();
        $heroSlideShow.slick('slickNext');
      });

      $('.hero-slideshow__arrow--left').click(function(e) {
        e.preventDefault();
        $heroSlideShow.slick('slickPrev');
      });

      $('.hero-slideshow__arrow').hover(function(e) {
        $(this).find('.hero-slideshow__arrow__title').animate({
          width: "toggle",
          opacity: "toggle"
        });
      });

    }

    // Start hero carousel
    init();
  });
})(jQuery);
;
/** 
 * Reveal content utility
 */
(function($){
  var $triggers = $('.reveal__trigger'),
      $contents = $('.reveal__content'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $contents.length) {
      // Run setup
      setup();

      $triggers.click(function(e) {
        var state = $(this).data('revealState');

        if (state == 'closed') {
          showContent(this);
        } else if (state == 'open') {
          hideContent(this);
        }
        e.preventDefault();
      });

      $('.reveal__close').click(function(e) {
        $(this).parent('.reveal__content').data('revealTrigger').click();
        e.preventDefault();
      });
    }
  });

  // Show the target content
  function showContent(trigger) {
    var data = $(trigger).data(),
        $trigger = $(trigger),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        hideText = data.revealHideText,
        type = data.revealType,
        media = data.revealMedia,
        scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true);


    $trigger.data('revealState', 'open')
    if (hideText != "") {
      $trigger.text(hideText);
    }
    $target.slideDown(animation);
    $curtain.slideUp(animation);

    if (media == "video") {
      setTimeout(function() {
        $target.find('video')[0].play();
      }, animation.duration/2);
    }

    if ($curtain.length) {
      smoothScrollTop($curtain, animation.duration, scrollOffset, true);
    }
  }

  // Hide the target content
  function hideContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        showText = data.revealShowText,
        media = data.revealMedia;

    $(trigger).data('revealState', 'closed').text(showText);
    $target.slideUp(animation);
    $curtain.slideDown(animation);

    if (media == "video") {
      $target.find('video')[0].pause();
    }
  }

  // Hand-full of setup tasks
  function setup() {
    // Add reveal-state data
    $triggers.data('revealState', 'closed');
    
    $triggers.each(function(index, el) {
      var $target = $('#' + $(this).data('revealTarget')),
          showText = $(this).text();
      
      // Link content back to it's corresponding trigger
      $target.data('revealTrigger', $(this));

      // Save original trigger text
      $triggers.data('revealShowText', showText);
    });

    // // Set initial margin on content if there is a curtain
    // // @TODO this is for naimating the reveal as if the content is 
    // // stationary and the elements above and below are revealing it. 
    // // Currently, the content moves up as the curtain slides up.
    // $contents.each(function(index, el) {
    //   var data = $($(this).data('revealTrigger')).data(),
    //       $curtain = $("#" + data.revealCurtain);

    //   if ($curtain.length) {
    //     $(this).css('margin-top', -$curtain.outerHeight(true));
    //   }
    // });

    // Add a close icon to each content continer
    $contents.prepend($('<a href="#" class="reveal__close" href="#">&#9587;</a>'));
  }

})(jQuery);
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
(function($){
  $(document).ready(function(){

    /**
     * Allows making an element sticky on the page with just a 'sticky' class.
     */
    $('.sticky').each(function(i) {
      var sticky = new Waypoint.Sticky({
        element: $(this)[0]
      });
    });

    if (matchMedia('(max-width: 960px)').matches) {
      $('.mobile-sticky').each(function(i) {
        var sticky = new Waypoint.Sticky({
          element: $(this)[0]
        });
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
 * Tabs content utility
 */
(function($){
  var $links = $('.tabs__tab-link'),
      $contents = $('.tabs__tab-content'),
      $linkTriggers = $('.tabs__tab-trigger'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($links.length && $contents.length) {
      $links.on('click.tabs', function(e) {
        if (!$(this).hasClass('active')) {
          var $link = $(this),
              $content = $('#' + $link.data('tab-content')),
              $previousLink = $link.closest("ul").find('.tabs__tab-link.active'),
              $previousContent = $('#' + $previousLink.data('tab-content')),
              previousContentHeight = $previousContent.outerHeight(true),
              $flyoutContainer = $content.closest('.flyout__content'),
              $contentClone = $content.clone().show().css({"height":"auto"}).appendTo($content.parent()),
              contentHeight = $contentClone.outerHeight(true);

          $contentClone.remove();

          // Manage active class
          $links.add($contents).removeClass('active');
          $link.add($content).addClass('active');

          // Animate the height transition between tabs
          $content.height(previousContentHeight).animate({
            height: contentHeight,
          }, animation);

          // Manage flyout container if tabs are within a flyout
          if ($flyoutContainer.length) {
            var $parent = $flyoutContainer.offsetParent(),
                parentPadding = $parent.outerHeight() - $parent.height(),
                flyoutHeight = $flyoutContainer.outerHeight(true),
                heightChange = contentHeight - previousContentHeight;

            // Adjust height of parent
            $parent.animate({
              height: flyoutHeight - parentPadding + heightChange,
            }, animation);
          }
        }
        e.preventDefault();
      });
      
      $linkTriggers.on('click.tabs-trigger', function(e) {
        var $link = $links.filter('[data-tab-content="' + $(this).data('tab-content') + '"]'),
            $content = $('#' + $(this).data('tab-content'));

        // Manage active class
        $links.add($contents).removeClass('active');
        $link.add($content).addClass('active');
      });

    }
  });
})(jQuery);
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
