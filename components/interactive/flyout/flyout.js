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
        $slideout = $parent.find('.flyout__slideout'),
        parentPadding = $parent.outerHeight() - $parent.height(),
        offset = $('.sticky-wrapper .stuck').outerHeight(true);

    $target.data('flyoutState', 'open');

    // Adjust height of parent
    $parent.animate({
      height: $target.outerHeight(true) - parentPadding,
    }, animation);

    $slideout.add($target).animate({
      marginLeft: '-=100%',
    }, animation);

    smoothScrollTop($parent, animation.duration, offset, true);
  }

  // Hide the target content
  function hideContent(trigger) {
    var data = $(trigger).data(),
        $target = $('#' + data.flyoutTarget),
        $parent = $target.offsetParent(),
        $slideout = $parent.find('.flyout__slideout'),
        slideoutHeight = $slideout.outerHeight(true);

    $target.data('flyoutState', 'closed');

    // Adjust height of parent
    $parent.animate({
      height: slideoutHeight,
    }, animation);

    $slideout.add($target).animate({
      marginLeft: '+=100%',
    }, animation);

    // Reset height of $parent to inherit in case of screen resizing that would 
    // need to adjust the height.
    setTimeout(function() {
      $parent.css('height', 'inherit');
    }, animation.duration + 1);
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