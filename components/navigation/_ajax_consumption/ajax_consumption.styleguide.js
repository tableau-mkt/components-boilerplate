(function($) {
  $(document).ready(function() {
    var domain = 'redesign-tableau.gotpantheon.com',//replace with cdn.tableau.com
        lang = $('html').attr('lang') || 'en',
        lang_map = {
          'en' : '',
          'fr' : 'fr-fr/',
          'de' : 'de-de/',
          'pt-br' : 'pt-br/',
          'es' : 'es-es/',
          'zh-hans' : 'zh-cn/',
          'ja' : 'ja-jp/',
          'ko' : 'ko-kr/'
        },
        protocol = location.protocol;

    // An example of loading the menus via AJAX (json).
    // Prepend the language if appropriate.
    /*$.ajax({
      url: protocol + '://' + domain + '/' + lang_map[lang] + 'ajax/megamenu',
      type: 'GET',
      dataType: 'json',
      success: tabAjaxMegaMenu,
      error: function(xhr, ajaxOptions, error) {
        console.log(xhr.status);
        console.log(error);
      }
    });*/

    // An example of loading the menus via AJAX (jsonp).
    // Prepend the language if appropriate.
    $.ajax({
        url: protocol + '://' + domain + '/' + lang_map[lang] + 'ajax/megamenu' + '/jsonp/' + 'tabAjaxMegaMenu',
        type: 'POST',
        dataType: 'jsonp'
    });
  });
})(jQuery);
