(function($) {
  $(document).ready(function() {

    /**
     * Handles closing the notification.
     */
    $('.global-notification .global-notification__close').click(function (e) {
      e.preventDefault();

      $('.global-notification').slideUp();
    });
  });
})(jQuery);
