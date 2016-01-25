/**
 * General Brightcove video embed binding.
 *
 * This is a generic setup for in-page embedded players. We can bind a VideoJS wrapped object to a data property on the player DOM element, allowing us to control players by selecting the DOM element and accessing the bcPlayer data property. E.g.:
 *
 * $('#my-playerthing').data('bcPlayer').play();
 * $('#my-playerthing').data('bcPlayer').pause();
 *
 * A more complicated example that retrieves the full video metadata via the Brightcove catalog method:
 *
 * var $video = $('#my-player-object');
 *
 * $video.data('bcPlayer').catalog.getVideo($video.data('videoId'),
 * function(error, data) {
 *   // Do things with the return.
 *   console.log(data);
 * });
 *
 * This presumes that the Brightcove API script has been loaded on page.
 */
$(document).ready(function () {
  // Use the default Brightcove embed selector.
  var $players = $('.video-js');

  // Bail early if there aren't even any players.
  if (!$players.length || typeof window.videojs !== 'function') {
    return;
  }

  $players.each(function setupBrightcoveInstances() {
    var $this = $(this);

    // Pass in the DOM element, not the jQuery wrapped object.
    window.videojs($this[0]).ready(function prepareBrightcoveInstance() {
      $this.data('bcPlayer', this);
      $(document).trigger('brightcove:ready', $this.attr('id'));
    });
  });
});
