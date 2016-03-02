/**
 * Modal message behaviors.
 *
 * - Toggle .is-open state on component, e.g when showing modal message.
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Create a base for this module's data and functions.
Components.modalMessage = {};

// Closure to rename Components.modalMessage
(function (component, $) {

  /**
   * Variables
   */
  component.modifiers = {
    'loading': 'modal-message--loading'
  };

  /**
   * DOM-ready callback.
   *
   * @param {Object} $
   *   jQuery
   */
  component.ready = function () {
    $('.modal-message, .modal-message__close').click(function (e) {
      if (e.target === this) {
        $('.modal-message').removeClass('is-open');
        e.preventDefault();
      }
    });
  };

  /**
   * Show modal message
   *
   * @param {string} message
   *   Optional message you want to display.
   * @param {string} type
   *   Optional parameter to alter the style of the message box.
   *   Example:
   *   'loading' - Show a loading modal message.
   */
  component.show = function (message, type) {
    var $modalMessage = $('.modal-message');

    // Initialize our modal message;
    if (!$modalMessage.length) {
      $modalMessage = $('<div class="modal-message">' +
        '<div class="modal-message__dialog">' +
        '<div class="modal-message__icon"></div>' +
        '<div class="modal-message__content"></div>' +
        '<a href="#" class="modal-message__close"></a>' +
        '</div>' +
        '</div>');
      $('body').append($modalMessage);
    }

    for (var key in component.modifiers) {
      if (type === key) {
        $modalMessage.addClass(component.modifiers[key]);
      }
      else {
        $modalMessage.removeClass(component.modifiers[key]);
      }
    }

    // Replace the content of our message.
    if (message) {
      component.update(message);
    }

    // Show our modal message.
    if (!$modalMessage.hasClass('is-open')) {
      $modalMessage.addClass('is-open');
    }
  };

  /**
   * Update message.
   *
   * @param {string} message
   *   Message you want to display.
   */
  component.update = function (message) {
    $('.modal-message__content').html(message);
  };

  /**
   * Close modal message
   */
  component.close = function () {
    $('.modal-message').removeClass('is-open');
  };

  // Dom ready handler.
  $(component.ready);

}(Components.modalMessage, jQuery));
