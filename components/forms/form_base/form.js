// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

Components.form = {};

Components.form.initFloatLabels = function ($elements) {
  $elements.find('input, select, textarea')
    .not('[type="checkbox"], [type="radio"]')
    .closest('.form-field')
    .floatLabel({
      labelSelector: '.form-field__label'
    });
};

$(document).ready(function () {
  Components.form.initFloatLabels($('.has-float-label'));
});

$(document).on('initFloatLabels', function (e) {
  Components.form.initFloatLabels($(e.target));
});
