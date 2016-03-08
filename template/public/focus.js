jQuery(function ($) {
  var isFocused = false,
      $originalParent,
      $examplePreview = $('.kss-focus-preview'),
      $closePreview = $('.kss-focus-ui__close'),
      originalScrollOffset,
      togglePreview;

  togglePreview = function (element) {
    isFocused = !isFocused;
    if (isFocused) {
      originalScrollOffset = window.pageYOffset;
      $originalParent = $(element).parent();
      $examplePreview.append(element);
      setTimeout(function () {
        $(window).resize();
      }, 0);
    }
    else {
      $originalParent.append(element);
      setTimeout(function () {
        window.scrollTo(0, originalScrollOffset);
        $(window).resize();
      }, 0);
    }
    $('body').toggleClass('is-focused', isFocused);
    $(element).toggleClass('is-focused', isFocused);
  };

  $('.kss-example-preview')
    .append($('<i class="icon-expand">'))
    .on('click', function (e) {
      if (e.metaKey) {
        togglePreview(this);
        e.preventDefault();
      }
    });

  $('.icon-expand').on('click', function () {
    togglePreview($(this).parent());
  });

  $closePreview.on('click', function () {
    togglePreview($examplePreview.children());
  });

});
