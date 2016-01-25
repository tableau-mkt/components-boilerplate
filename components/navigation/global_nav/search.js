/**
 * Global search bar interaction
 */
(function($) {
  $(document).ready(function() {
    var $searchWrapper = $('.global-nav__search'),
        $searchToggle = $('.global-nav__search-toggle'),
        $closeSearch = $('.global-nav__search-close'),
        animation = {
          duration: 500,
          easing: "easeInOutQuart"
        };

    $searchToggle.on('click', function(e) {
      e.preventDefault();
      $(this).parents('.global-nav__top').addClass('global-nav--search-shown');
      $searchWrapper.fadeIn(animation);

      // Make sure to focus the search field
      $searchWrapper.find('input[type="search"]').focus();
    });

    $closeSearch.on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      $searchToggle.parents('.global-nav__top').removeClass('global-nav--search-shown');
      $searchWrapper.fadeOut(animation);
    });
  });
})(jQuery);
