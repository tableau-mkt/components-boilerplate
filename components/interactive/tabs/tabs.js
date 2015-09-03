/** 
 * Tabs component interaction
 * See jquery.tabs.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.tabs__tab-link').tabs({
      contents: $('.tabs__tab-content'),
      triggers: $('.tabs__tab-trigger')
    });
  });
}( jQuery ));
