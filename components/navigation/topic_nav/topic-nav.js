/** 
 * Topic Navigation interaction
 * Requires jquery.contentReveal.js and jquery.tabs.js
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.topic-nav__tabs a').tabs({
      contents: $('.topic-nav__drawer')
    });

    $('.topic-nav__drawers').contentReveal({
      triggers: $('.topic-nav__toggle a')
    })
  });
}( jQuery ));
