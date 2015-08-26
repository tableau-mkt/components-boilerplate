/** 
 * Reveal content component interaction
 * See jquery.contentReveal.js for details
 */

(function ( $ ) {
  $(document).ready(function(){
    $('.reveal__content').contentReveal({
      triggers: $('.reveal__trigger')
    });
  });
}( jQuery ));
