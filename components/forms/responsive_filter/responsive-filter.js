/**
 * Responsive filters interaction
 *
 * See jquery.dynamicSelectFilters.js
 */
(function ($) {
  $(document).ready(function () {
    $('.responsive-filter').dynamicSelectFilters({
      container: '.responsive-filter__select',
      groupHeading: '.responsive-filter__heading',
      onCreateSelectCallback: function () {
        // 'this' is the jQuery wrapped select element, created per group set.
        this.wrap('<div class="form__select"></div>');
      }
    });
  });
})(jQuery);
