/**
 * Simple content search behaviors.
 *
 * - Handle down/up arrow keys on pick list
 */

// Loose augmentation pattern. Creates top-level Tabia variable if it doesn't
// already exist.
var Tabia = Tabia || {};

// Create a base for this module's data and functions.
Tabia.contentSearch = {};

/**
 * DOM-ready callback.
 *
 * @param {Object} $
 *   jQuery
 */
Tabia.contentSearch.ready = function ($) {
  // Set up all the section search components on the page.
  $('.content-search').not('.contextual-search').each(function () {
    var $this = $(this);

    // Attach keydown handler with context.
    $this.find('.content-search__input').keydown(
      $.proxy(Tabia.contentSearch.keydownHandler, $this)
    );

    // Attach reset handler.
    $this.find('.content-search__reset').click(function (event) {
      // Allow overriding.
      var $resetEvent = $.Event('contentSearch:reset');
      $this.trigger($resetEvent);
      if (!$resetEvent.isDefaultPrevented()) {
        // Reset/empty the form, via AJAX.
        Tabia.contentSearch.resetForm($this);
      }
    });
  });
};

/**
 * Carry out the form reset.
 *
 * @param {jQuery Object} $search
 */
Tabia.contentSearch.resetForm = function($search) {
  $search.removeClass('has-suggestion');
  $search.find('.content-search__input').val('');
};

/**
 * Carry out the form submit.
 *
 * @param {jQuery Object} $search
 */
Tabia.contentSearch.submitForm = function($search) {
  if ($search.find('.content-search__input').val() !== '') {
    $search.removeClass('has-suggestion');
    $search.find('.content-search__submit').click();
  }
};

/**
 * Keydown handler.
 *
 * @param {Object} event
 */
Tabia.contentSearch.keydownHandler = function (event) {
  var $search = $(this[0]),
      $submitEvent = $.Event('contentSearch:submit');

  switch (event.which) {
    case 13: // ENTER
      $search.removeClass('has-suggestion');
      // Allow overriding.
      $(document).trigger($submitEvent);
      // Submit the form, via AJAX.
      if (!$submitEvent.isDefaultPrevented()) {
        // Prevent any further events from occurring on the input.
        $search.find('.content-search__input').prop('readonly', true)
          .off('keyup keydown blur');
        Tabia.contentSearch.submitForm($search);
      }
      event.preventDefault();
      break;
  }
};

// Attach our DOM-ready callback.
jQuery(Tabia.contentSearch.ready);
