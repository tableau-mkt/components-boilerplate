$(document).ready(function () {
  $('.has-float-label').find('input, select, textarea')
    .not('[type="checkbox"], [type="radio"]')
    .closest('.form__field-wrapper')
    .floatLabel();
});
