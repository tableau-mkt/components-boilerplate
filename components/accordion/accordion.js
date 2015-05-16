/**
 * Custom Accordion implementation.
 */

(function($){
  $(document).ready(function(){
    if ($(".accordion").length) {
      $(".accordion .accordion--item--content").not('.open .accordion--item--content').hide();

      $(".accordion .accordion--item--title").click( function(e) {
        var $t = $(this);
        $t.siblings(".accordion--item--content").slideToggle(250, 'linear');

        $t.parents(".accordion--item").toggleClass("open");
        if (!$t.closest('.accordion').find('.accordion-select-all').length) {
          $t.parents(".accordion--item").siblings().find('.accordion--item--content').slideUp(250, 'linear');
          $t.parents(".accordion--item").siblings().removeClass("open");
        }

        e.preventDefault();
      });
      
      // Auto-scroll and expand accordions when linked to with a hash
      var hash = window.location.hash;
      if ($(hash).length && $(hash).closest('.accordion--item').length) {
        $(hash).siblings('.field-collection-view').find('.accordion--item--title').trigger('click');   
      }
    }
  });
})(jQuery);
