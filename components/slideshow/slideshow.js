(function($){
  $(document).ready(function(){
    var $heroSlideShow = $('.slideshow--hero');

    // Initialize hero carousel
    function init() {
      if($heroSlideShow) {
        $heroSlideShow.slick({
          dots: true,
          arrows: false,
          slide: '.slide'
        });
        // slideShowNavigation();
        // carouselControls();

        $(window).resize(function(){
          // SetTimeout waiting for image resize
          setTimeout(function(){
            carouselControls();
          },1000);
        });
      }
    }

    function carouselControls() {
      var $slides = $heroSlideShow.find('.slide'),
      slideImgHeight = parseInt($slides.find('.hero-slide-image').css('paddingBottom')),
      $slickControls = $('.slick-dots'),
      $carouselArrows = $('.carousel-arrow'),
      $carouselArrowLeft = $('.carousel-arrow.left'),
      $carouselArrowRight = $('.carousel-arrow.right'),
      $header = $('header'),
      headerHeight = $header.height(),
      viewportWidth,
      viewportHeight,
      smallViewport = 640;

      // Set dots on top of image
      $slickControls.css('top',slideImgHeight-30);

      // Run calculations for arrows
      calculateArrowPositions();

      function calculateArrowPositions(){
        if($carouselArrows.length) {
          // Height
          $carouselArrows.css('top',slideImgHeight/2);

          viewportWidth = $(window).width();
          viewportHeight = $(window).height();

          //Large view port centering
          if(viewportWidth > smallViewport) {
            $carouselArrows.css('display','block');

            var totalViewportHeight = viewportHeight - headerHeight;

            var rightMargin = ($('.hero-slide-show-container').width() - $header.find('.content').width())/2;
            $carouselArrowRight.css('right',rightMargin);
            $carouselArrowLeft.css('left',rightMargin);
          }
          //Small view port hide arrows
          else {
            $carouselArrows.css('display','none');
          }
        }
      }
    }

    function slideShowNavigation() {
      var $slides = $heroSlideShow.find('.slide').not('.slick-cloned'),
      $slidesID = [],
      $slideHoverText = [],
      $slideHoverClass = [],
      arrows,
      next,
      prev,
      arrowRightInverted,
      arrowLeftInverted;

      // Get slide navigation values from the dom
      for(var k=0; k < $slides.length; k++) {
        $slidesID.push($($slides[k]).attr('id'));
        $slideHoverText.push($($slides[k]).data('title'));
        $slideHoverClass.push($($slides[k]).data('title-class'));
      }

      // Create slide navigation dom
      for(var i=0; i < $slides.length; i++) {
        next = i+1;
        prev = i-1;
        arrowLeftInverted = '';
        arrowRightInverted = '';

        // Account for looping
        if(prev === -1) {
          prev = $slides.length -1;
        }

        if(next === $slides.length) {
          next = 0;
        }

        if($slideHoverClass[prev].match('inverted')) {
          arrowLeftInverted = 'inverted';
        }

        if($slideHoverClass[next].match('inverted')) {
          arrowRightInverted = 'inverted';
        }

        arrows = '<a href="#" class="carousel-arrow left '+arrowLeftInverted+'"><span class="title '+ $slideHoverClass[prev] +'"><span class="text">'+ $slideHoverText[prev] +'</span></span><span class="icon-hero-carousel-arrow-left"></span></a> <a href="#" class="carousel-arrow right '+arrowRightInverted+'"><span class="icon-hero-carousel-arrow-right"></span><span class="title '+ $slideHoverClass[next] +'"><span class="text">'+ $slideHoverText[next] +'</span></span></a>';
        $($slides[i]).append(arrows);
      }

      slideShowNavigationEvents();
    }

    // Next and previous arrow integration with slick
    function slideShowNavigationEvents() {

      $('.carousel-arrow.right').click(function(e){
        e.preventDefault();
        $heroSlideShow.slick('slickNext');
      });

      $('.carousel-arrow.left').click(function(e){
        e.preventDefault();
        $heroSlideShow.slick('slickPrev');
      });

    }

    // Start hero carousel
    init();
  });
})(jQuery);
