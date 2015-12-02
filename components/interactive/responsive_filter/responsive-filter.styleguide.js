/**
 * Responsive filters demo
 *
 * Just for the styleguide.
 */
(function ($) {
  $(document).ready(function () {
    $('.filter-set').dynamicSelectFilters({
      container: '.mobile-filter-set',
      groupHeading: '.filter-set__heading',
      onCreateSelectCallback: function () {
        // 'this' is the jQuery wrapped select element, created per group set.
        this.wrap('<div class="form-field__wrapper"><div class="form__select"></div></div>');
      }
    });
  });
})(jQuery);
