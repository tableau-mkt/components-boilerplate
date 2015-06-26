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
