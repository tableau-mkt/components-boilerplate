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
 * Reveal content utility
 */
(function($){
  $(document).ready(function(){
    if ($('.reveal--trigger').length && $('.reveal--content').length) {
      $('.reveal--content').prepend($('<a href="#" class="reveal--close" href="#">&#9587;</a>'));
      $('.reveal--trigger').click(function(e) {
        var target = $(this).data('reveal-target');
        $('#' + target).slideToggle();

        e.preventDefault();
      });

      // Close the revealed content when close button is clicked
      $('.reveal--close').click(function(e) {
        $(this).parent('.reveal--content').slideUp();
        e.preventDefault();
      });
    }
  });
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
          slide: '.slideshow__slide'
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

      $('.slideshow__arrow--right').click(function(e){
        e.preventDefault();
        $heroSlideShow.slick('slickNext');
      });

      $('.slideshow__arrow--left').click(function(e){
        e.preventDefault();
        $heroSlideShow.slick('slickPrev');
      });

    }

    // Start hero carousel
    init();
  });
})(jQuery);
