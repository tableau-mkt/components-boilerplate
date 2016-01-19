(function($) {
  $(document).ready(function() {

    /**
     * Handles closing the notification.
     */
    $('.notification .notification__close').click(function () {
      $('.notification').slideUp();
    });
  });
})(jQuery);
