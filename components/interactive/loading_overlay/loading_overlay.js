/**
 * Loading overlay behaviors.
 *
 * - Show a loading animation w/ overlay.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.loadingOverlay = {};

// Closure to rename Components.modalMessage
(function (component, $) {

  /**
   * Show loading overlay
   *
   * @param {string} $element
   *   The element on which you want to show the loading animation.
   * @param {string} message
   *   Optional message to display in the loading overlay.
   */
  component.show = function ($element, message) {
    var message = message || 'Loading...',
        $overlay = $('<div class="loading-overlay">' +
                   '<div class="loader">' +
                   '<div class="loader__animation"></div>' +
                   '<div class="loader__message">' + message + '</div>' +
                   '</div>' +
                   '</div>'),
        $loader = $overlay.children('.loader'),
        offsetY = getElementViewPortCenter($element);

    $loader.css('top', offsetY);
    $overlay.prependTo($element)
  };

  /**
   * Hide loading overlay
   *
   * @param {string} $element
   *   The element on which you want to show the loading animation.
   */
  component.hide = function ($element) {
    $element.find('.loading-overlay').remove();
  };

  /**
   * Helper function to get the element's viewport center.
   * @param $element
   *
   * @returns string
   *  y position
   */
  function getElementViewPortCenter($element) {
    var scrollTop = $(window).scrollTop(),
        scrollBot = scrollTop + $(window).height(),
        elHeight = $element.outerHeight(),
        elTop = $element.offset().top,
        elBottom = elTop + elHeight,
        elTopOffset = elTop < scrollTop ? scrollTop - elTop : 0,
        elBottomOffset = elBottom > scrollBot ? scrollBot - elTop : elHeight;

    // Return 50% if entire element is visible.
    if (elTopOffset === 0 && elBottomOffset === elHeight) {
      return '50%';
    }

    return Math.round(elTopOffset + ((elBottomOffset - elTopOffset) / 2)) + 'px';
  }

}(Components.loadingOverlay, jQuery));
