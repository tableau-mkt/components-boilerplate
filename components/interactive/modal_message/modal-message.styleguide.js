(function($) {
  $(document).ready(function(){
    $('#show-modal-message').click(function (e) {
      e.preventDefault();
      Components.modalMessage.show();
    });

    $('#show-loading-modal-message').click(function (e) {
      e.preventDefault();
      Components.modalMessage.show(null, 'loading');
    });

    $('#close-modal-message').click(function (e) {
      e.preventDefault();
      Components.modalMessage.close();
    });
  });
}(jQuery));
