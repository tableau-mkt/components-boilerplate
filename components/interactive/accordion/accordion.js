/**
 * Custom Accordion implementation.
 */

(function($){
  $(document).ready(function(){
    var $accordion = $('.accordion'),
        animation = {
          duration: 400,
          easing: "easeInOutQuart"
        };

    if (!$accordion.length) {
      return;
    }

    $('.accordion .accordion__content').not('.open .accordion__content').hide();
    $('.accordion .accordion__title').click( function(e) {
      var $this = $(this),
          $openItems = $this.parent().siblings('.open');

      // Close other open items.
      $openItems.find('.accordion__content').slideToggle(animation);
      $openItems.toggleClass('open');

      // Open new item.
      $this.siblings('.accordion__content').slideToggle(animation);
      $this.parents('.accordion__item').toggleClass('open');

      e.preventDefault();
    });

    // Auto-scroll and expand accordions when linked to with a hash
    var hash = window.location.hash;
    if ($(hash).length && $(hash).closest('.accordion__item').length) {
      $(hash).parents('.accordion__title').trigger('click');
    }
  });
})(jQuery);
