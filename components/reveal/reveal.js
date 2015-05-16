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
