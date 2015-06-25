/**
 * Sidebar nav  interaction including scroll-aware highlighting
 */

(function($){
  var $nav = $('.subnav__links'),
      $anchors = $('.anchor');

  $(document).ready(function(){
    if ($nav.length && $anchors.length) {
      $anchors.waypoint({
        handler: function(direction) {
          var id = this.element.id;
          if (direction === 'down') {
            $nav.find('a[href=#' + id + ']').parent().addClass('active').siblings().removeClass('active');
          } else if (direction === 'up') {
            $nav.find('a[href=#' + id + ']').parent().prev().addClass('active').siblings().removeClass('active');
          }
        },
        offset: $('.subnav').outerHeight(true)
      });
    }

    // Smooth Scroll for anchor links
    // @TODO generalize and separate from this component
    $nav.find('a').click(function(e) {
      var element = $(this).attr('href'),
          offset = $('.subnav').outerHeight(true) - 1;
      $('body,html').animate({scrollTop:$(element).offset().top - offset},500);
      e.preventDefault();
    });
    
  });
})(jQuery);