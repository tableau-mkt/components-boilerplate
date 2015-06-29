var Tabia = Tabia || {};

Tabia.yo = function(content) {
  window.console && console.log(content || "Yo");
};

Tabia.later = function(func, time) {
  setTimeout(func, time || 2000);
};
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
        parentPadding = $parent.outerHeight() - $parent.height();

    $target.data('flyoutState', 'open');

    $target.animate({
      left: '0%',
    }, animation);

    // Adjust height of parent
    $parent.animate({
      height: $target.outerHeight(true) - parentPadding,
    }, animation);
  }

  // Hide the target content
  function hideContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.flyoutTarget),
        $parent = $target.offsetParent(),
        parentPadding = $parent.outerHeight() - $parent.height(),
        $parentClone = $parent.clone().css({"height":"auto"}).appendTo($parent.parent()),
        parentHeight = $parentClone.css("height");

    $parentClone.remove();

    $target.data('flyoutState', 'closed');
    
    $target.animate({
      left: '100%',
    }, animation);

    // Adjust height of parent
    $parent.animate({
      height: parentHeight,
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
 * Global gavigation interactions
 */
(function($){
  var $globalNav = $('.global-nav'),
      $menu = $globalNav.find('.global-nav__primary-menu'),
      $expandableLinks = $menu.find('li.expandable'),
      $drawer = $('.global-nav__drawer'),
      $hamburger = $globalNav.find('.hamburger'),
      $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
      animation = {
        duration: 750,
        easing: "easeInOutQuart"
      };

  $(document).ready(function(){
    
    // Drawer Expanding interaction
    // @todo needs lots of work here.
    $expandableLinks.hover( 
      function() {
        openDrawer(this);
      }, function() {
        $globalNav.find('a').not($(this).find('a')).hover(function() {
          closeDrawer();
        });
      }
    );

    $drawer.click(function(e) {
      e.stopPropagation();
    });

    $(document).click(function() {
      closeDrawer();
    });

    // Mobile menu
    $hamburger.on('click.global-nav', function(e) {
      $mobileWrapper.slideToggle(animation);
      $hamburger.parent().toggleClass('open');
      e.preventDefault();
    });


  });

  function openDrawer(el) {
    $(el).addClass('expanded');
    $drawer.slideDown();
  }

  function closeDrawer() {
    $expandableLinks.removeClass('expanded');
    $drawer.slideUp();
  }





  /***************************************************************************
  * HUGE Code below - @todo remove
  ***************************************************************************/

  // Nav event listeners
  // navigationSetup();

  // Product navigation functionality
  // productNavigationSetup();

  $(document).ready(function(){
    function navigationSetup() {
      var $hamburger = $('.hamburger'),
          $hamburgerClose = $('.hamburger-close'),
          $globalNav = $('.navigation-global').not('.navigation-global.small'),
          $globalNavSmall = $('.navigation-global.small'),
          $globalNavDropdown = $('.navigation-global-dropdown'),
          $globalNavDrawer = $('.sub-navigation-global-drawer').not('.sub-navigation-global-drawer.small'),
          $globalNavDrawerSmall = $('.sub-navigation-global-drawer.small'),
          $globalNavSmallContainer = $globalNavSmall.find('.navigation-global-container'),
          $productsBack = $globalNavSmall.find('.back'),
          $products = $globalNav.find('.products'),
          $productsSmall = $globalNavSmall.find('.products'),
          $productsArrow = $products.find('.arrow-up'),
          $header = $('header'),
          animationDuration = 300;

      // Global navigation expand/hide sub navigation in small
      $hamburger.on('click',function(e){
        e.preventDefault();

        $globalNavDropdown.add($globalNavSmall).addClass('expand');

        $hamburger.css({'display':'none'});
        $hamburgerClose.css({'display':'block'});

        $globalNavDropdown.slideDown(function(){
          // Reset productNav scrolling position
          resetProductNavigation();
        });

      });

      $hamburgerClose.on('click', function(e){
        e.preventDefault();

        $hamburger.css({'display':'block'});
        $hamburgerClose.css({'display':'none'});

        $globalNavDropdown.add($globalNavSmall).removeClass('expand');
        $globalNavDropdown.slideUp(function(){
          // Reset productNav scrolling position
          resetProductNavigation();
        });
      });

      // Product navigation large
      $products.hover(function(){
        productNavOpen();
      }, function(){
        $globalNav.find('li').not($products).add('main').hover(function() {
          productNavClose();
        });
      });


      function productNavOpen() {
        $globalNav.addClass('products-flyout');
        $globalNavDrawer.slideDown();
        $productsArrow.fadeIn();
      }

      function productNavClose() {
        $globalNav.removeClass('products-flyout');
        $globalNavDrawer.slideUp(function() {
          $productsArrow.fadeOut();
        });
      }

      // Product navigation small
      $productsSmall.on('click', function(e){
          e.preventDefault();
          e.stopPropagation();

          $globalNavSmallContainer.animate({
            'left':'-100%'
          }, animationDuration);
          $globalNavDrawerSmall.animate({
            'left':'0'
          }, animationDuration);

      });

      $productsBack.on('click', function(e){
        e.preventDefault();

        $globalNavSmallContainer.animate({
          'left':'0'
        }, animationDuration);
        $globalNavDrawerSmall.animate({
          'left':'100%'
        }, animationDuration);

      });

      $(window).resize(function(){
        if($(window).width() < mediumViewport) {
          productNavClose();
        }
      });
    }

    function productNavigationSetup() {
      var scroll,
          $productNav = $('.navigation-product-primary'),
          $productNavSmall = $('.navigation-product-body'),
          $productNavBtn = $('.navigation-product').find('.button'),
          $navProductLinks = $('.navigation-product-links'),
          productNavHeight = 0,
          stickySmall,
          sticky,
          navScrollComplete = true;

      function resetProductNavigation() {
        Waypoint.refreshAll();
        if($(window).width() <= smallViewport) {
          productNavHeight = $productNavSmall.height();
        }
        else {
          productNavHeight = $productNav.height();
        }
      }

      // On navigation link click scroll to content
      $productNav.add($productNavSmall).find('a').not('.button a').on('click',function(e){
        e.preventDefault();
        var waypointID = $(this).parent().attr('class').split(' ')[0];
        navScrollComplete = false;
        $('html,body').animate({
          scrollTop:$('#'+ waypointID).offset().top - productNavHeight
        },{
          complete: function() {
            navScrollComplete = true;
          }
        });
        updateNavigationHighlight(waypointID);
      });

      sticky = mainNav.waypoint(function(direction) {

        if (direction === 'up') {
          $productNav.removeClass('stuck');
          $productNavSmall.removeClass('stuck');
        }
        else {
          $productNav.addClass('stuck');
          $productNavSmall.addClass('stuck');
        }
      },{
        offset: function() {
          return -mainNav.height();
        }
      });


      var waypointsUp = $('.waypoint').waypoint(function(direction) {
        var elID =  this.element.id;
        if (navScrollComplete) {
          updateNavigationHighlight(elID, direction);
        }
      },{
        offset: '10%'
      });

      // Coordinate highlight section with nav link
      function updateNavigationHighlight(elID,direction) {
        // Remove highlights
        $productNav.add($productNavSmall).find('li').removeClass('active');

        var $elActive;

        if(direction === 'up' && (elID !== 'overview')) {
          $productNav.add($productNavSmall).find('li.'+elID+'').prev().addClass('active');
          $elActive = $('li.'+elID+'').prev();
        } else {
          $productNav.add($productNavSmall).find('li.'+elID+'').addClass('active');
          $elActive = $('li.'+elID+'');
        }


        // Move active link to first positon
        if($(window).width() <= smallViewport) {
          activeLinkPosition($elActive);
        }
      }

      function activeLinkPosition($elActive) {
        var $prevLinks = $productNavSmall.find($elActive).prevAll(),
            marginLeft = 0;

        $prevLinks.each(function() {
          marginLeft += $(this).outerWidth();
        });

        $navProductLinks.scrollLeft(marginLeft);
      }

      // Onload
      resetProductNavigation();

      // Recalculate on resize
      $(window).on('resize', function() {
        // Trigger scroll to update nav
        $(window).scroll();
        resetProductNavigation();
      });

      $productNavBtn.on('click', function(e){
        e.preventDefault();

        if($(window).width() <= mediumViewport) {
          $('html, body').animate({
            scrollTop: $('footer').offset().top
          }, 500);
        }
      });
    }

    function resetProductNavigation() {
      mainNavPosition = mainNav.offset();
      mainNavHeight = mainNav.height();
      mainNavScrollDistance = mainNavPosition.top + mainNavHeight;
    }

  });
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
      $(this).parents('.global-nav').addClass('global-nav--search-shown');
    });

    $closeSearch.on('click', function(e){
      e.stopPropagation();
      e.preventDefault();
      $search.parents('.global-nav').removeClass('global-nav--search-shown');
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
        media = data.revealMedia;

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
(function($){
  $(document).ready(function(){
    var $heroSlideShow = $('.slideshow--hero');

    // Initialize hero carousel
    function init() {
      if($heroSlideShow) {
        $heroSlideShow.slick({
          dots: true,
          arrows: false,
          speed: 650,
          easing: "easeInOutQuart",
          slide: '.slideshow__slide',
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
      var $slides = $heroSlideShow.find('.slideshow__slide').not('.slick-cloned'),
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
        $arrowLeft = $slides.eq(i).find('.slideshow__arrow--left');
        $arrowRight = $slides.eq(i).find('.slideshow__arrow--right');
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
            .find('.slideshow__arrow__title')
            .addClass(slideHoverClass[prev])
            .html(slideHoverText[prev]);
        
        $arrowRight.addClass(arrowRightInverted)
            .find('.slideshow__arrow__title')
            .addClass(slideHoverClass[next])
            .html(slideHoverText[next]);
      }

      slideShowNavigationEvents();
    }

    // Next and previous arrow integration with slick
    function slideShowNavigationEvents() {

      $('.slideshow__arrow--right').click(function(e) {
        e.preventDefault();
        $heroSlideShow.slick('slickNext');
      });

      $('.slideshow__arrow--left').click(function(e) {
        e.preventDefault();
        $heroSlideShow.slick('slickPrev');
      });

      $('.slideshow__arrow').hover(function(e) {
        $(this).find('.slideshow__arrow__title').animate({
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
      $('body,html').animate({scrollTop:$(element).offset().top - offset},500);
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
        nextArrow: $(this).find('.viz-slideshow__arrow--next')
      });
    }
  });
})(jQuery);
