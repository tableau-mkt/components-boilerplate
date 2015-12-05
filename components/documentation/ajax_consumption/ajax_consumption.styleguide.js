(function($) {
  $(document).ready(function() {
    $.ajax({
        url: 'https://give:feedback@redesign-tableau.gotpantheon.com/ajax/megamenu/jsonp/tabAjaxMegaMenu',
        type: 'POST',
        dataType: 'jsonp'
    });
  });
})(jQuery);
