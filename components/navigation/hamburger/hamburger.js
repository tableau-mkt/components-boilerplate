/**
 * Hamburger interaction interactions
 */
(function($){
  $(document).ready(function(){
    var $hamburger = $('.hamburger');

    if ($hamburger.length) {
      $hamburger.on('click.hamburger', function(e) {
        $(this).toggleClass('hamburger--open');
        e.preventDefault();
      });
    }
  });
})(jQuery);
