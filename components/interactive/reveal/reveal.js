/** 
 * Reveal content utility
 */
(function($){
  var $triggers = $('.reveal__trigger'),
      $contents = $('.reveal__content'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $contents.length) {
      // Run setup
      setup();

      $triggers.click(function(e) {
        var state = $(this).data('revealState');

        if (state == 'closed') {
          showContent(this);
        } else if (state == 'open') {
          hideContent(this);
        }
        e.preventDefault();
      });

      $('.reveal__close').click(function(e) {
        $(this).parent('.reveal__content').data('revealTrigger').click();
        e.preventDefault();
      });

      // Trigger auto-reveal
      autoReveal();
    }
  });

  // Show the target content
  function showContent(trigger, customAnimation) {
    var data = $(trigger).data(),
        $trigger = $(trigger),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        hideText = data.revealHideText,
        type = data.revealType,
        media = data.revealMedia,
        scrollOffset = $('.sticky-wrapper .stuck').outerHeight(true),
        customAnimation = customAnimation || animation;

    $trigger.data('revealState', 'open')
    if (hideText != "") {
      $trigger.text(hideText);
    }
    
    // Video players break when we display none so using a custom reimplementation
    // of slideDown. See helpers.js.
    $target.slideHeight('down', customAnimation);
    
    $curtain.slideUp(customAnimation);

    if (media == "video") {
      var videoObj = $target.find('.reveal-video--brightcove')[0],
          player = videojs(videoObj);

      setTimeout(function() {
        player.play();
      }, customAnimation.duration/2);
    }

    if ($curtain.length) {
      smoothScrollTop($curtain, customAnimation.duration, scrollOffset, true);
    }
  }

  // Hide the target content
  function hideContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.revealTarget),
        $curtain = $('#' + data.revealCurtain),
        showText = data.revealShowText,
        media = data.revealMedia;

    $(trigger).data('revealState', 'closed').text(showText);
    
    $target.slideHeight('up', animation);
    
    $curtain.slideDown(animation);

    if (media == "video") {
      var player = videojs($target.find('.reveal-video--brightcove')[0]);
      player.pause();
    }
  }

  // Hand-full of setup tasks
  function setup() {
    // Add reveal-state data
    $triggers.data('revealState', 'closed');
    
    $triggers.each(function(index, el) {
      var $target = $('#' + $(this).data('revealTarget')),
          showText = $(this).text();
      
      // Link content back to it's corresponding trigger
      $target.data('revealTrigger', $(this));

      // Save original trigger text
      $triggers.data('revealShowText', showText);
    });

    // // Set initial margin on content if there is a curtain
    // // @TODO this is for naimating the reveal as if the content is 
    // // stationary and the elements above and below are revealing it. 
    // // Currently, the content moves up as the curtain slides up.
    // $contents.each(function(index, el) {
    //   var data = $($(this).data('revealTrigger')).data(),
    //       $curtain = $("#" + data.revealCurtain);

    //   if ($curtain.length) {
    //     $(this).css('margin-top', -$curtain.outerHeight(true));
    //   }
    // });

    // Add a close icon to each content continer
    $contents.prepend($('<a href="#" class="reveal__close" href="#">&#9587;</a>'));
  }

  function autoReveal() {
    var hash = window.location.hash;

    if (hash.length && $contents.is(hash)) {
      var $trigger = $(hash).data('revealTrigger');

      // Prevent scrolling to the anchor...
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 1);

      showContent($trigger, {duration: 0});
    }
  }

})(jQuery);
