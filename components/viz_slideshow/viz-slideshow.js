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
