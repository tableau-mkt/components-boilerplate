/**
 * Content search behaviors.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.contentSearch = {};

// Closure to extend behavior, provide privacy and state.
(function (component, $) {

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function ($) {
    // Set up all the section search components on the page.
    $('.content-search').not('.contextual-search').each(function () {
      component.initialize($(this));
    });
  };

  /**
   * Initialize component.
   * - Binds contentSearch event handlers, and unbinds any existing ones.
   */
  component.initialize = function ($search) {
    // Attach keydown handler with context.
    $search.find('.content-search__input')
      .off('keydown.contentSearch')
      .on('keydown.contentSearch', $.proxy(Components.contentSearch.keydownHandler, $search)
    );

    // Attach reset click handler to component.
    $search.find('.content-search__reset')
      .off('click.contentSearch')
      .on('click.contentSearch', function () {
        // Allow overriding.
        var resetEvent = $.Event('contentSearch:reset');
        $search.trigger(resetEvent);
        if (!resetEvent.isDefaultPrevented()) {
          // Reset/empty the form, via AJAX.
          component.resetForm($search);
        }
      });
  };

  /**
   * Carry out the form reset.
   *
   * @param {jQuery Object} $search
   */
  component.resetForm = function ($search) {
    $search.removeClass('has-suggestion');
    $search.find('.content-search__input').val('');
  };

  /**
   * Carry out the form submit.
   *
   * @param {jQuery Object} $search
   */
  component.submitForm = function ($search) {
    if ($search.find('.content-search__input').val() !== '') {
      $search.addClass('has-suggestion');
      $search.find('.content-search__submit').click();
    }
  };

  /**
   * Keydown handler.
   *
   * @param {Object} event
   */
  component.keydownHandler = function (event) {
    var $search = $(this[0]),
        submitEvent = $.Event('contentSearch:submit');

    switch (event.which) {
      case 13: // ENTER
        // Allow overriding.
        $search.trigger(submitEvent);
        // Submit the form, via AJAX.
        if (!submitEvent.isDefaultPrevented()) {
          // Prevent any further events from occurring on the input.
          $search.find('.content-search__input').prop('readonly', true)
            .off('keyup keydown blur');
          Components.contentSearch.submitForm($search);
        }
        event.preventDefault();
        break;
    }
  };

})(Components.contentSearch, jQuery);

// Attach our DOM-ready callback.
jQuery(Components.contentSearch.ready);
