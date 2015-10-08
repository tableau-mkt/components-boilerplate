"use strict";

/**
 * jQuery Float Labels
 *
 * A simple plugin to enable the floating label pattern. It makes no attempt to
 * control any interactions of the label within js. It just binds to events as
 * needed and triggers configurable CSS classes.
 *
 * The jQuery method is called on the wrapper element that contains both the field
 * and the label. It might look like:
 *
 * <div class="field__wrapper">
 *   <label class="field__label" for="this-field">My Super Label</label>
 *   <input name="this-field">
 * </div>
 *
 * The javascript init, with options thrown in:
 * $('.field__wrapper').floatLabel({
 *   activeClass: 'activated',
 *   focusClass: 'zenified'
 * });
 */
(function ($) {
  $(document).ready(function () {

    // Set plugin method name and defaults
    var pluginName = 'floatLabel',
        defaults = {
          // In case you want to preserve labels as visible for no js, or old
          // IE users.
          wrapperInitClass: 'has-float-label',
          // For a custom label selector, if you have multiple labels, for some
          // reason.
          labelSelector: false,
          // Class given to label when its field has a non-null value. Toggled
          // when the value is empty / falsy.
          activeClass: 'is-active',
          // Class given to label when its field is focused. Toggled when it
          // loses focus.
          focusClass: 'has-focus'
        };

    // plugin constructor
    function Plugin (element, options) {
      var $element = $(element);

      // Set up internals for tracking, just in case.
      this._name = pluginName;
      this._defaults = defaults;
      this._element = $element;

      // Use the init options.
      this.options = $.extend(true, defaults, options);

      // Set up a couple of internals to keep track of input and label.
      this._wrapper = $element;
      this._input = this._findInput($element);
      this._label = this._findLabel($element);

      // Do it now.
      this.init();
    }

    // Utility: find a input that we want to alter the label for.
    Plugin.prototype._findInput = function(el) {
      var $textInputs = $(el).find('input, textarea').not('[type="checkbox"], [type="radio"]');
      // The regular text input types.
      if ($textInputs.length) {
        return $textInputs;
      }
      // Try for select elements.
      else {
        return $(el).find('select');
      }
      return false;
    };

    // Utility: find a label in the field wrapper element.
    Plugin.prototype._findLabel = function(el) {
      // If a custom selector is provided
      if (this.options.labelSelector) {
        return $(el).find(this.options.labelSelector);
      }

      // Just try a label element.
      return $(el).find('label');
    };

    Plugin.prototype._onKeyUp = function (ev) {
      // On empty value, inactivate the label.
      if (this._input.val() === '') {
        this._label.removeClass(this.options.activeClass);
      }
      else {
        this._label.addClass(this.options.activeClass);
      }
      ev && ev.preventDefault();
    };

    Plugin.prototype._onFocus = function (ev) {
      this._label.addClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype._onBlur = function (ev) {
      this._label.removeClass(this.options.focusClass);
      this._onKeyUp();
      ev && ev.preventDefault();
    };

    Plugin.prototype.init = function () {
      // Mark the element as having been init'ed.
      this._element.addClass(this.options.wrapperInitClass);

      // Event bindings to the input element.
      this._input.on('keyup change', $.proxy(this._onKeyUp, this));
      this._input.on('blur', $.proxy(this._onBlur, this));
      this._input.on('focus', $.proxy(this._onFocus, this));
    };

    // Lightweight constructor, preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
      return this.each(function initPlugin() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName,
          new Plugin(this, options));
        }
      });
    };

  });
})(jQuery);
