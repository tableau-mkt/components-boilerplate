// Fake the 'tabAjaxMegaMenu:ready' event in order to demonstrate the navigation
// within the styleguide.
$(document).ready(function() {
  var $search = $('.global-nav__search'),
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

  $(document).trigger('tabAjaxMegaMenu:ready');

  // Search auto-complete for demo purposes. Requires jQuery UI Autocomplete
  // @todo add support for highlighting the searched characters in the list
  //    http://stackoverflow.com/questions/2435964/jqueryui-how-can-i-custom-format-the-autocomplete-plug-in-results
  $search.find("input").autocomplete({
    source: availableTags,
    appendTo: ".global-nav"
  });
});
