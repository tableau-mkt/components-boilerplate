/**
 * Flyout content component interaction
 * See jquery.contentFlyout.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.flyout__content').contentFlyout({
      triggers: $('.flyout__trigger')
    });
  });
}( jQuery ));
