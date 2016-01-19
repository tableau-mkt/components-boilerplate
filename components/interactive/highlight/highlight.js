(function($) {
  $.fn.highlightSonar = function () {
    var $el = $(this),
        sonar = "highlight--sonar",
        $sonar = $('<div class="' + sonar + '"></div>');

    $el.remove(sonar).prepend($sonar);

    // Remove our sonar pulse after 5 seconds.
    setTimeout(function()
    {
      $el.find(sonar).remove();
    }, 5000);
  };
}( jQuery ));
