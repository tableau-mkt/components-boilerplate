$(document).ready(function () {
  $('input, select, textarea').not('[type="checkbox"], [type="radio"]').closest('.form-field__wrapper').floatLabel();
});
