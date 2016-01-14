(function($){
  var $vizSlideshow = $('.teaser-slideshow');

  $(document).ready(function(){
    if ($vizSlideshow.length) {
      $vizSlideshow.slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        speed: 650,
        easing: 'easeInOutQuart',
        slide: '.teaser-item',
        prevArrow: '<button class="teaser-slideshow__arrow teaser-slideshow__arrow--prev"><i class="icon icon--chevron-left">Previous</i></button>',
        nextArrow: '<button class="teaser-slideshow__arrow teaser-slideshow__arrow--next"><i class="icon icon--chevron-right">Next</i></button>',
        responsive: [
          {
            breakpoint: 940,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 639,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '50px',
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
