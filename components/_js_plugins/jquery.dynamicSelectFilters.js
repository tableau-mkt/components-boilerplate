'use strict';

/**
 * jQuery Dynamic Select Filters
 *
 * Given a set of input radio options, generate a corresponding select list per
 * option group and binds change events so that using the select triggers the
 * original option inputs, which may now be hidden.
 *
 * The javascript init, with options thrown in:
 *

  $('.filter-set').dynamicSelectFilters({
    container: '.mobile-filter-set',
    groupHeading: '.filter-set__heading',
    onCreateSelectCallback: function () {
      // 'this' is the jQuery wrapped select element, created per group set.
      this.wrap('<div class="form-field__wrapper"><div class="form__select"></div></div>');

      // Perform additional event bindings as needed.
      this.on('click.namespace', function myCoolEvent(e) {
        doMyThings();
      });
    }
  });

 */
(function ($) {
  // Set plugin method name and defaults
  var pluginName = 'dynamicSelectFilters',
      defaults = {
        // A DOM selector of the container to place the dyanmic <select> elements.
        // If not defined, one will be generated and placed before the first
        // option group found.
        container: false,
        // An optional DOM selector to provide a default option in the select
        // element. Should be located inside the grouping DOM element.
        groupHeading: '',
        // Callback function after each select is created. Passes in the newly
        // created select jQuery element to perform any additional modifications.
        onCreateSelectCallback: null
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

    // Do it now.
    this.init();
  }

  Plugin.prototype.init = function () {
    var _options = this.options,
        $radioGroups = this._element,
        $selectContainer = $(_options.container);

    if (!$radioGroups.length) {
      return;
    }

    // If no container for the select is defined, add one.
    if (!$selectContainer.length) {
      $radioGroups.eq(0).before('<div class="dynamic-select-container"></div>');
      $selectContainer = $radioGroups.eq(0).prev('.dynamic-select-container');
    }

    $radioGroups.each(function initSelectDuplication() {
      var $this = $(this),
          // Grouping label, generated as a disabled option within the select to
          // act as a label.
          groupHeading = $this.find(_options.groupHeading),
          $input = $this.find('input[type="radio"]'),
          $label = $this.find('label'),
          $select = $('<select>'),
          selectOptions = '';

      if (!$input.length) {
        return;
      }

      // If given a groupHeading element, use it to create a placeholder-esque
      // option for the current <select>
      if (groupHeading.length) {
        selectOptions = '<option class="select-placeholder" disabled selected>' + groupHeading.text().trim().replace(/\:$/, '') + '</option>';
      }

      // Continue building out the select options using all the radio/checkbox inputs.
      $input.each(function buildSelectOptions() {
        var $this = $(this),
            $label = $this.next('label'),
            triggerElement = '#' + $this.attr('id').trim(),
            isSelected = ($this.is(':checked')) ? 'selected' : '';

        // Let the option value be the input element to trigger, by DOM id.
        selectOptions += '<option value="' + triggerElement + '" ' + isSelected + '>' + $label.text() + '</option>';

        // Sync the select state when the option input is used.
        $this.on('change.dynamicfilter', function twoWayValueBind() {
          $select.find('option[value="' + triggerElement + '"]').prop('selected', true);
        });
      });

      // Flesh out the select, and enact bindings.
      $select.html(selectOptions)
        .on('change.dynamicfilter', function bindDynamicSelectActions() {
          var $triggerEl = $($(this).val());

          $triggerEl.prop('checked', true);
        })
        .appendTo($selectContainer);

        // Apply any per instance callbacks.
        if (typeof _options.onCreateSelectCallback === 'function') {
          _options.onCreateSelectCallback.call($select);
        }
    });
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
})(jQuery);

