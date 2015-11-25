(function($){
  var $vizSlideshow = $('.fullbleed-slideshow');

  $(document).ready(function(){
    if ($vizSlideshow.length) {
      $vizSlideshow.slick({
        centerMode: true,
        centerPadding: '200px',
        slidesToShow: 1,
        arrows: true,
        speed: 650,
        easing: "easeInOutQuart",
        slide: '.large-teaser',
        prevArrow: "<button class='fullbleed-slideshow__arrow fullbleed-slideshow__arrow--prev'><i class='icon icon--slideshow-prev'>Previous</i></button>",
        nextArrow: "<button class='fullbleed-slideshow__arrow fullbleed-slideshow__arrow--next'><i class='icon icon--slideshow-next'>Next</i></button>",
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
