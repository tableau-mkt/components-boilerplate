(function($){
  $(document).ready(function(){
    var $content = $('#loading-overlay-content');

    $('#loading-overlay-trigger').click(function () {
      Components.loadingOverlay.show($content);
    });
  });
}( jQuery ));
