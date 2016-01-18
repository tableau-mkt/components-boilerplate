(function($) {
  $.fn.highlightShadow = function (modifierClass) {
    var $el = $(this),
        modifierClass = modifierClass || 'highlight--normal';

    $el.addClass('highlight').addClass(modifierClass)
      .one('transitionend webkitTransitionEnd oTransitionEnd',
        function (e) {
          $el.removeClass(modifierClass);
        }
      );
  };
}( jQuery ));
