/**
 * Section search behaviors.
 *
 * - Toggle .is-open state on component, e.g., upon AJAX search result.
 * - Handle down/up arrow keys on pick list
 */

// Loose augmentation pattern. Creates top-level Tabia variable if it doesn't
// already exist.
var Tabia = Tabia || {};

// Create a base for this module's data and functions.
Tabia.contextualSearch = {};

/**
 * DOM-ready callback.
 *
 * @param {Object} $
 *   jQuery
 */
Tabia.contextualSearch.ready = function ($) {
  // Set up all the section search components on the page.
  $('.contextual-search').each(function () {
    var $this = $(this),
        // Initialze a data object for this instance.
        search = {
          selectionIndex: -1
        };
    // Save a reference to this element.
    search.element = this;
    // Attach keydown handler with our data context.
    $this.keydown($.proxy(Tabia.contextualSearch.keydownHandler, search));
    // Attach UI click handler. Don't propagate clicks to document.
    $this.find('.contextual-search__ui').click(function (event) {
      event.stopPropagation();
    });
    // Attach document click handler to close (blur) the results list.
    $(document).click(function contextualSearchBlur() {
      $(search.element).removeClass('is-open');
    });
    // Attach reset handler.
    $this.find('.contextual-search__reset').click(function contextualSearchReset() {
      $(search.element).removeClass('is-open');
    });
  });
};

/**
 * Keydown handler.
 *
 * @param {Object} event
 */
Tabia.contextualSearch.keydownHandler = function (event) {
  // Only handle keys when the results list is open.
  if (!$(this.element).hasClass('is-open')) {
    return;
  }

  switch (event.keyCode) {
    case 38: // UP
      Tabia.contextualSearch.select.call(this, -1);
      break;
    case 40: // DOWN
      Tabia.contextualSearch.select.call(this, 1);
      break;
    case 27: // ESCAPE
      $(this.element).removeClass('is-open');
      break;
    case 13: // ENTER
      Tabia.contextualSearch.select(0);
      this.$rows.get(this.selectionIndex).click();
      event.preventDefault();
      break;
  }
};

/**
 * Set the row selection up/current/down.
 *
 * @param {Number} direction
 *   -1, 0, or 1
 */
Tabia.contextualSearch.select = function (direction) {
  this.$rows = $(this.element).find('.contextual-search__results-row');
  this.selectionIndex += direction;
  this.selectionIndex = Math.max(this.selectionIndex, 0);
  this.selectionIndex = Math.min(this.selectionIndex, this.$rows.length - 1);
  this.$rows.removeClass('is-selected')
    .eq(this.selectionIndex).addClass('is-selected');
};

// Attach our DOM-ready callback.
jQuery(Tabia.contextualSearch.ready);
