/**
 * Topic Navigation interaction
 * Requires jquery.contentReveal.js and jquery.tabs.js
 */

(function ( $ ) {
  $(document).ready(function() {
    // Tabs integration
    $('.topic-nav__tabs a').tabs({
      contents: $('.topic-nav__drawer')
    });

    // contentReveal interaction
    $('.topic-nav__drawers').contentReveal({
      triggers: $('.topic-nav__toggle'),
      closeLink: false
    });

    // Custom tweaks
    $('.topic-nav__toggle').on('click.topic-nav', function(e) {
      var $parentNav = $(this).closest('.topic-nav');

      if ($(this).data('revealState') == 'open') {
        $parentNav.find('.topic-nav__tabs a').eq(0).trigger('click').addClass('is-active');
      }
      else {
        $parentNav.find('.topic-nav__tabs a').removeClass('is-active');
      }
    });

    $('.topic-nav__tabs a').on('click.topic-nav', function(e) {
      var $toggle = $(this).closest('.topic-nav').find('.topic-nav__toggle');

      if ($toggle.data('revealState') == 'closed') {
        $toggle.trigger('click.reveal');
      }
    });

  });
}( jQuery ));
