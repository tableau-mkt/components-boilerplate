(function($) {
  $(document).ready(function() {
    $.ajax({
        url: 'https://cdns.tblsft.com/ajax/megamenu/jsonp/tabAjaxMegaMenu',
        type: 'POST',
        dataType: 'jsonp'
    });
  });
})(jQuery);
