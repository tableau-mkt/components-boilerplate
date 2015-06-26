/** 
 * Tabs content utility
 */
(function($){
  var $links = $('.tabs__tab-link'),
      $contents = $('.tabs__tab-content'),
      $linkTriggers = $('.tabs__tab-trigger'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($links.length && $contents.length) {
      $links.on('click.tabs', function(e) {
        if (!$(this).hasClass('active')) {
          var $link = $(this),
              $content = $('#' + $link.data('tab-content')),
              $previousLink = $link.closest("ul").find('.tabs__tab-link.active'),
              $previousContent = $('#' + $previousLink.data('tab-content')),
              previousContentHeight = $previousContent.outerHeight(true),
              $flyoutContainer = $content.closest('.flyout__content'),
              $contentClone = $content.clone().show().css({"height":"auto"}).appendTo($content.parent()),
              contentHeight = $contentClone.outerHeight(true);

          $contentClone.remove();

          // Manage active class
          $links.add($contents).removeClass('active');
          $link.add($content).addClass('active');

          // Animate the height transition between tabs
          $content.height(previousContentHeight).animate({
            height: contentHeight,
          }, animation);

          // Manage flyout container if tabs are within a flyout
          if ($flyoutContainer.length) {
            var $parent = $flyoutContainer.offsetParent(),
                parentPadding = $parent.outerHeight() - $parent.height(),
                flyoutHeight = $flyoutContainer.outerHeight(true),
                heightChange = contentHeight - previousContentHeight;

            // Adjust height of parent
            $parent.animate({
              height: flyoutHeight - parentPadding + heightChange,
            }, animation);
          }
        }
        e.preventDefault();
      });
      
      $linkTriggers.on('click.tabs-trigger', function(e) {
        var $link = $links.filter('[data-tab-content="' + $(this).data('tab-content') + '"]'),
            $content = $('#' + $(this).data('tab-content'));

        // Manage active class
        $links.add($contents).removeClass('active');
        $link.add($content).addClass('active');
      });

    }
  });
})(jQuery);
