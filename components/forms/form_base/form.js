// Loose augmentation pattern. Creates top-level Tabia variable if it doesn't
// already exist.
var Tabia = Tabia || {};

Tabia.form = {};

Tabia.form.initFloatLabels = function ($elements) {
  $elements.find('input, select, textarea')
    .not('[type="checkbox"], [type="radio"]')
    .closest('.form-field')
    .floatLabel({
      labelSelector: '.form-field__label'
    });
};

$(document).ready(function () {
  Tabia.form.initFloatLabels($('.has-float-label'));
});

$(document).on('initFloatLabels', function (e) {
  Tabia.form.initFloatLabels($(e.target));
});
