/** 
 * Tabs content utility
 */
(function($){
  var $links = $('.tabs__tab-link'),
      $contents = $('.tabs__tab-content'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($links.length && $contents.length) {
      $links.click(function(e) {
        if (!$(this).hasClass('active')) {
          var $link = $(this),
              $content = $('#' + $link.data('tab-content')),
              $previousLink = $link.closest("ul").find('.tabs__tab-link.active'),
              $previousContent = $('#' + $previousLink.data('tab-content'));

          // Manage active class
          $links.add($contents).removeClass('active');
          $link.add($content).addClass('active');
        }
        e.preventDefault();
      });
    }
  });
})(jQuery);
