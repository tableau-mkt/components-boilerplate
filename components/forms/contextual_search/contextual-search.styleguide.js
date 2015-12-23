/**
 * Section search styleguide integration.
 */

jQuery(function ready($) {
  $('.contextual-search .content-search__input').keydown(function (event) {
    var keyCode = $.ui.keyCode;

    switch (event.keyCode) {
      case keyCode.UP:
      case keyCode.DOWN:
      case keyCode.ESCAPE:
      case keyCode.ENTER:
        break;
      default:
        $(this).parents('.contextual-search').addClass('is-open');
    }

  });
});
