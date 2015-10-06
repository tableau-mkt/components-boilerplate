/**
 * Brightcove video chapter handling.
 *
 * This handles chaptering interaction given an expected DOM structure. E.g.:
 * <ul class="video__chapters" data-chapters-for="[VIDEO DOM ID]">
 *   <li class="video__chapter" data-timestamp="60">Something</li>
 *   <li class="video__chapter" data-timestamp="120">Something else</li>
 * </ul>
 *
 * It listens for a brightcove:ready event that is raised per video instance as
 * it successfully creates a Brightcove videojs wrapped player object.
 */
(function ($, window) {
  $(document).ready(function () {
    var $chapterLists = $('[data-chapters-for]');

    // Bail early if there aren't even any lists of chapters.
    if (!$chapterLists.length || !typeof window.videojs === 'function') {
      return;
    }

    // Utilize the revealContent plugin.
    $chapterLists.each(function initChapterReveal() {
      $(this).contentReveal({
        triggers: $(this).next('.video-chapters__toggle-wrapper').find('.video-chapters__toggle'),
        closeLink: false
      });
    });

    // The Brightcove player binding is async. We wait for a raised event first
    // before binding the video chapter actions.
    $(document).on('brightcove:ready', function (e, data) {
      // The 'data' received here is the id attribute of the video player element.
      var $readyChapters = $chapterLists.filter('[data-chapters-for="' + data + '"]'),
          $videoElement = $('#' + data),
          BCPlayer = $videoElement.data('bcPlayer');

      // Bail early.
      if (!$readyChapters.length) {
        return;
      }

      $readyChapters.find('.video-chapters__chapter').on('click.chapter', function triggerVideoChapter (e) {
        var $this = $(this),
            timestamp = $this.data('timestamp');

        e.preventDefault();

        // Set the play time.
        BCPlayer.currentTime(timestamp);

        // Scroll.
        smoothScrollTop($videoElement);

        // Play the video if it ain't playing.
        if (BCPlayer.paused()) {
          BCPlayer.play();
        }
      });
    });

  });
})(jQuery, window);
