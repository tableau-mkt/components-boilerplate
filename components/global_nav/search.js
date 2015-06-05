/** 
 * Global search bar interaction
 */
(function($){
  $(document).ready(function(){
    var $search = $('.global-nav__search'),
        $closeSearch = $search.find('.global-nav__search__close'),
        availableTags = [
          "Tableau",
          "Desktop",
          "Server",
          "Online",
          "Cloud",
          "Public",
          "Reader",
          "Business Intelligence",
          "Data",
          "Products",
          "Graphs",
          "Visualizations"
        ];

    $search.on('click', function(e){
      e.preventDefault();
      $(this).parents('.global-nav').addClass('global-nav--search-shown');
    });

    $closeSearch.on('click', function(e){
      e.stopPropagation();
      e.preventDefault();
      $search.parents('.global-nav').removeClass('global-nav--search-shown');
    });
    
    // Search auto-complete for demo purposes. Requires jQuery UI Autocomplete
    // @todo add support for highlighting the searched characters in the list
    //    http://stackoverflow.com/questions/2435964/jqueryui-how-can-i-custom-format-the-autocomplete-plug-in-results
    $search.find("input").autocomplete({
      source: availableTags,
      appendTo: ".global-nav"
    });

  });
})(jQuery);
