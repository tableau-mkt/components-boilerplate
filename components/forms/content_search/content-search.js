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
  $('.content-search').each(function () {
    var $this = $(this);
    // Attach keydown handler with context.
    $this.keydown($.proxy(Tabia.contentSearch.keydownHandler, $this));
    // Attach reset handler.
    $this.find('.content-search__reset').click(function contentSearchReset() {
      $this.removeClass('is-populated');
      $this.find('.content-search__input').val('');
      $this.find('.contextual-search__submit').click();
    });
  });
};

/**
 * Keydown handler.
 *
 * @param {Object} event
 */
Tabia.contentSearch.keydownHandler = function (event) {
  var $form = $(this[0]);

  switch (event.which) {
    case 13: // ENTER
      if ($form.find('.content-search__input').val() !== '') {
        $form.find('.contextual-search__submit').click();
      }
      event.preventDefault();
      break;
  }
};

// Attach our DOM-ready callback.
jQuery(Tabia.contentSearch.ready);
