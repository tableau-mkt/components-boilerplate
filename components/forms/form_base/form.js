$(document).ready(function () {
  var options = {
    labelSelector: '.form-field__label'
  };

  $('.has-float-label').find('input, select, textarea')
    .not('[type="checkbox"], [type="radio"]')
    .closest('.form-field')
    .floatLabel(options);
});
