(function($) {
  $.fn.moveProgressBar = function (progress) {
    var $el = $(this),
        $progress = $el.find('.progress'),
        progress = progress || parseInt($progress.data('progress')) || 0,
        tresholds = [5, 50, 100],
        modifier = '';

    for (var treshold in tresholds) {
      if (progress <= treshold) {
        modifier = 'progress--' + treshold;
        break;
      }
    }

    // Make sure we have a valid percentage.
    progress = (progress > 100) ? 100 : progress;

    $progress.removeClass (function (index, css) {
      return (css.match (/(^|\s)progres--\S+/g) || []).join(' ');
    }).css({
      'width': progress + '%'
    }).addClass(modifier);
  };
}( jQuery ));
