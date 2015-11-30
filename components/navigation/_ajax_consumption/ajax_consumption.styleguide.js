(function($) {
  $(document).ready(function() {
    $.ajax({
        url: 'https://redesign-tableau.com/ajax/megamenu/jsonp/tabAjaxMegaMenu',
        type: 'POST',
        dataType: 'jsonp'
    });
  });
})(jQuery);
