/** 
 * Flyout content utility
 */
(function($){
  var $triggers = $('.flyout__trigger'),
      $contents = $('.flyout__content'),
      animation = {
        duration: 1000,
        easing: "easeInOutQuart"
      };
  
  $(document).ready(function(){
    if ($triggers.length && $contents.length) {
      // Run setup
      setup();


      $triggers.on('click.flyout', function(e) {
        var trigger = this,
            $target = $('#' + $(trigger).data('flyoutTarget')),
            state = $target.data('flyoutState');

        if (state == 'closed') {
          setTimeout(function() {
            showContent(trigger);
          }, 1);
        } else if (state == 'open') {
          hideContent(trigger);
        }
        e.preventDefault();
      });

      $('.flyout__close-link').on('click.flyout', function(e) {
        $(this).closest('.flyout__content').data('flyoutTrigger').trigger('click.flyout');
        e.preventDefault();
      });
    }

  });

  // Show the target content
  function showContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.flyoutTarget),
        $parent = $target.offsetParent(),
        parentPadding = $parent.outerHeight() - $parent.height();

    $target.data('flyoutState', 'open');

    $target.animate({
      left: '0%',
    }, animation);

    // Adjust height of parent
    $parent.animate({
      height: $target.outerHeight(true) - parentPadding,
    }, animation);
  }

  // Hide the target content
  function hideContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.flyoutTarget),
        $parent = $target.offsetParent(),
        parentPadding = $parent.outerHeight() - $parent.height(),
        $parentClone = $parent.clone().css({"height":"auto"}).appendTo($parent.parent()),
        parentHeight = $parentClone.css("height");

    $parentClone.remove();

    $target.data('flyoutState', 'closed');
    
    $target.animate({
      left: '100%',
    }, animation);

    // Adjust height of parent
    $parent.animate({
      height: parentHeight,
    }, animation);
  }

  // Hand-full of setup tasks
  function setup() {
    // Add flyout-state data
    $contents.data('flyoutState', 'closed');
    
    // Link content back to it's corresponding trigger
    $triggers.each(function(index, el) {
      var $target = $('#' + $(this).data('flyoutTarget'));
      $target.data('flyoutTrigger', $(this));
    });

    // Set the relative parent to hide overflow
    $contents.each(function(index, el) {
      $(this).show();
      $(this).offsetParent().css('overflow', 'hidden');
    });
  }

})(jQuery);




/*******************************************************************************
 * HUGE CODE
*******************************************************************************/

function dataSourcesSearch() {
  var $dataSources = $('.data-sources-flyout'),
      $dataSearch = $dataSources.find('input[type=search]'),
      $dataItems,
      pattern,
      dataItemText;

  // While the user types look for matching terms
  $dataSearch.on('keyup', function(e){
    // Get the current search container bullet points
    $dataItems = $(this).parents('.data-sources-container').find('.data-sources-content li');

    // Go through each bullet point to make text with search
    $dataItems.each(function(){
      // Regex pattern to match any word
      pattern = new RegExp("(\\b" + $dataSearch.val() + "\\b)", "gim");

      // Get the text of each bullet point
      dataItemText = $(this).text();

      // Remove previous spans in bullet point text
      dataItemText = dataItemText.replace(/(<span>|<\/span>)/igm, "");

      // Add new span
      dataItemText = dataItemText.replace(pattern, "<span>$1</span>");

      // Update current data item text
      $(this)[0].innerHTML = dataItemText;
    });

  });

  }