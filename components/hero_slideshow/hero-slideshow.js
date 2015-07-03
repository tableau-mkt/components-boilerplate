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
