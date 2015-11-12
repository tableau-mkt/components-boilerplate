/**
 * Video playlist script for demo purposes only.
 */
(function ($, window) {
  $(document).ready(function () {
    var $playlistVideo = $('.video-playlist__link');

    $playlistVideo.click(function(e) {
      e.preventDefault();

      $('.video-playlist__item-wrapper.active').removeClass('active');
      $(this).closest('.video-playlist__item-wrapper').addClass('active');
    });

  });
})(jQuery, window);
