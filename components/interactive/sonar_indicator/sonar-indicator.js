(function($) {
  $.fn.sonarPulse = function () {
    var $el = $(this),
        padding = 0;
        sonarPositionX = '10px',
        sonarSelector = '.sonar-indicator',
        $sonarElement = $('<div class="sonar-indicator"></div>');

    // Try and place the sonar indicator without obstructing the element.
    if ($el.css('padding-left')) {
      padding = parseInt($el.css('padding-left').replace("px", ""));
      sonarPositionX = (padding/2) - 5 + 'px';
    }
    $sonarElement.css('left', sonarPositionX);
    $el.remove(sonarSelector).prepend($sonarElement);

    // Remove our sonar pulse after 5 seconds.
    setTimeout(function()
    {
      $el.find(sonarSelector).remove();
    }, 5000);
  };
}(jQuery));
