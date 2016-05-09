jQuery(function ($) {
  var isFocused = false,
      $originalParent,
      $examplePreview = $('.kss-focus-preview'),
      $closePreview = $('.kss-focus-ui__close'),
      originalScrollOffset,
      togglePreview,
      $lastPreviewedComponent;

  togglePreview = function ($element) {
    isFocused = !isFocused;
    if (isFocused) {
      originalScrollOffset = window.pageYOffset;
      $originalParent = $element.parent();
      $examplePreview.append($element);
      setTimeout(function () {
        $(window).resize();
      }, 0);
      // Save the id/index to localStorage.
      if (localStorage) {
        localStorage.setItem('previewComponentId', $originalParent.parents('.kss-section').attr('id'));
        localStorage.setItem('previewComponentIndex', $originalParent.index());
      }
    }
    else {
      $originalParent.append($element);
      setTimeout(function () {
        window.scrollTo(0, originalScrollOffset);
        $(window).resize();
      }, 0);
      if (localStorage) {
        localStorage.removeItem('previewComponentId');
        localStorage.removeItem('previewComponentIndex');
      }
    }
    $('body').toggleClass('is-focused', isFocused);
    $element.toggleClass('is-focused', isFocused);
  };

  $('.kss-example-preview')
    .append($('<i class="icon-expand">'))
    .on('click', function (e) {
      if (e.metaKey) {
        togglePreview($(this));
        e.preventDefault();
      }
    });

  $('.icon-expand').on('click', function () {
    togglePreview($(this).parent());
  });

  $closePreview.on('click', function () {
    togglePreview($examplePreview.find('.kss-example-preview'));
  });

  // If we were previewing a component, re-open it.
  if (localStorage) {
    $lastPreviewedComponent = $('#' + localStorage.getItem('previewComponentId'))
      .find('.kss-example')
      .eq(localStorage.getItem('previewComponentIndex'))
      .find('.kss-example-preview');

    if ($lastPreviewedComponent.length) {
      togglePreview($lastPreviewedComponent);
    }
  }
});
