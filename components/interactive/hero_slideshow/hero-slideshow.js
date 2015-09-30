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
