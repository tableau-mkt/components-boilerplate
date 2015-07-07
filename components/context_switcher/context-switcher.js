/** 
 * Context Switcher component
 */
(function($){
  var $triggers = $('.context-switcher__trigger'),
      $lists = $('.context-switcher__list'),
      animation = {
        duration: 500,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $lists.length) {
      // Run setup
      setup();


      $triggers.on('click.contextSwitcher', function(e) {
        var $trigger = $(this),
            $list = $trigger.closest('.context-switcher').find('.context-switcher__list');

        if ($trigger.hasClass('open')) {
          $list.slideUp(animation);
          $trigger.removeClass('open');
        } else {
          $list.slideDown(animation);
          $trigger.addClass('open');
        }
        e.preventDefault();
      });

      $lists.find('a').on('click.contextSwitcher', function(e) {
        var $option = $(this),
            $list = $option.closest('.context-switcher__list'),
            $trigger = $option.closest('.context-switcher').find('.context-switcher__trigger');

        $trigger.text($option.text());

        $list.slideUp(animation);
        $trigger.removeClass('open');

        $option.parent().addClass('selected').siblings().removeClass('selected');

        e.preventDefault();
      });
    }

  });

  // Hand-full of setup tasks
  function setup() {

  }

})(jQuery);
