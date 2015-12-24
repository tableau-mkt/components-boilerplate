/**
 * Custom Accordion implementation.
 */

(function($){
  $(document).ready(function(){
    var $accordion = $('.accordion');

    if (!$accordion.length) {
      return;
    }

    $('.accordion .accordion__content-wrapper').not('.open .accordion__content-wrapper').hide();
    $('.accordion .accordion__title-wrapper').click( function(e) {
      var $this = $(this),
          $openItems = $this.parent().siblings('.open');

      // Close other open items.
      $openItems.find('.accordion__content-wrapper').slideToggle(250, 'linear');
      $openItems.toggleClass('open');

      // Open new item.
      $this.siblings('.accordion__content-wrapper').slideToggle(250, 'linear');
      $this.parents('.accordion__item').toggleClass('open');

      e.preventDefault();
    });

    // Auto-scroll and expand accordions when linked to with a hash
    var hash = window.location.hash;
    if ($(hash).length && $(hash).closest('.accordion__item').length) {
      $(hash).siblings('.accordion__title').trigger('click');
    }
  });
})(jQuery);
