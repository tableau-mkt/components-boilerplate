/**
 * Video playlist script for demo purposes only.
 */
(function ($, window) {
  $(document).ready(function () {
    var $playlistVideo = $('.video-playlist__link');

    $playlistVideo.click(function playlistVideoClick(e) {
      e.preventDefault();

      $('.video-playlist__item-wrapper.is-active').removeClass('is-active');
      $(this).closest('.video-playlist__item-wrapper').addClass('is-active');
    });

  });
})(jQuery, window);
