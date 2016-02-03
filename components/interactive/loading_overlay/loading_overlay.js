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
        offsetY = Components.utils.getElementViewPortCenter($element);

    $overlay.find('.loader').css('top', offsetY);
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

}(Components.loadingOverlay, jQuery));
