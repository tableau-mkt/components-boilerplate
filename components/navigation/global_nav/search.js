/**
 * Global search bar interaction
 */
(function($){
  $(document).ready(function(){
    var $search = $('.global-nav__search'),
        $closeSearch = $search.find('.global-nav__search__close');

    $search.on('click', function(e){
      e.preventDefault();
      $(this).parents('.global-nav__top').addClass('global-nav--search-shown');
      $(this).find('input[type="search"]').focus();
    });

    $closeSearch.on('click', function(e){
      e.stopPropagation();
      e.preventDefault();
      $search.parents('.global-nav__top').removeClass('global-nav--search-shown');
    });
  });
})(jQuery);
