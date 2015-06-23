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


      $triggers.click(function(e) {
        var state = $(this).data('flyoutState');

        if (state == 'closed') {
          showContent(this);
        } else if (state == 'open') {
          hideContent(this);
        }
        e.preventDefault();
      });

      $('.flyout__close').click(function(e) {
        $(this).parent('.flyout__content').data('flyoutTrigger').click();
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

    $(trigger).data('flyoutState', 'open');
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

    $(trigger).data('flyoutState', 'closed');
    
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
    $triggers.data('flyoutState', 'closed');
    
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

    // Add a close icon to each content continer
    $contents.prepend($('<a href="#" class="link flyout__close" href="#">Close &#9587;</a>'));
  }

})(jQuery);




/*******************************************************************************
 * HUGE CODE
*******************************************************************************/

function dataSources() {
    var $analyzeProfit = $('.analyze-profit'),
        $seeMoreData = $analyzeProfit.find('.see-data-sources'),
        $seeLessData = $analyzeProfit.find('.back'),
        $productFeatureContent = $analyzeProfit.find('.product-feature-content'),
        $compare = $('.product-comparison'),
        compareHeight,
        $compareContent = $compare.find('.product-comparison-content'),
        $blockNumber = $compare.find('.block-number'),
        $blockNumberBack = $compare.find('.back'),
        $dataSources = $('.data-sources-flyout'),
        $dataSourcesConnect = $('.data-sources-flyout.connect-data'),
        $dataSourcesComparison = $('.data-sources-flyout.comparison'),
        $sources = $('.sources'),
        $tabs = $('.data-sources-tabs li'),
        animationSpeed = 300,
        analyzeProfitHeight;

    // Show data sources flyout
    $seeMoreData.on('click', function(e){
      e.preventDefault();

      analyzeProfitHeight = $dataSourcesConnect.outerHeight();

      $dataSourcesConnect.animate({
        left: 0
      }, animationSpeed);

      $analyzeProfit.animate({
        height: analyzeProfitHeight
      }, animationSpeed);

    });

    $blockNumber.on('click', function(e){
      e.preventDefault();

      var elClass;

      // trigger click on correct tab
      if($(this).hasClass('personal')){
        elClass = 'personal';
      }
      else {
        elClass = 'professional';
      }

      // Open to correct tab
      tabs($dataSourcesComparison, elClass);

      $dataSourcesComparison.animate({
        left: 0
      }, animationSpeed);
    });

    // Hide data sources flyout
    $seeLessData.on('click', function(e){
      e.preventDefault();

      analyzeProfitHeight = $productFeatureContent.outerHeight();

      $dataSourcesConnect.animate({
        left: '100%'
      }, animationSpeed);

      $analyzeProfit.animate({
        height: analyzeProfitHeight
      }, animationSpeed);

    });

    $blockNumberBack.on('click', function(e){
      e.preventDefault();

      compareHeight = $compareContent.outerHeight();

      $dataSourcesComparison.animate({
        left: '100%'
      }, animationSpeed);

      $compare.animate({
        height: compareHeight
      }, animationSpeed);
    });

    // Toggle sources
    $tabs.first().addClass('active');

    $tabs.on('click', function(e){
      e.preventDefault();
      var elClass = $(this).attr('class').split(' ')[0];
      var elContainer;

      if($(this).parents('.data-sources-flyout').hasClass('comparison')) {
        elContainer = $dataSourcesComparison;
      }
      else {
        elContainer = $dataSourcesConnect;
      }
      tabs(elContainer, elClass);
    });

    function tabs(container, elClass){
      container.find($tabs).removeClass('active');
      container.find('.data-sources-tabs').find('li.'+elClass).toggleClass('active');
      container.find($sources.not($("." +elClass+".sources"))).css('display','none');
      container.find("."+elClass+'.sources').css({ display: "block"});

      changeHeight(container);
    }

    function changeHeight(container) {
      // Page resize container
      if(typeof(container) === 'undefined') {

        if($dataSourcesConnect.css('left') === '0px') {
          analyzeProfitHeight = $dataSourcesConnect.outerHeight();
        }
        else {
          analyzeProfitHeight = $productFeatureContent.outerHeight();
        }

        if ($dataSourcesComparison.css('left') === '0px') {
          compareHeight = $dataSourcesComparison.outerHeight();
        }
        else {
          compareHeight = $compareContent.outerHeight();
        }

        $analyzeProfit.animate({
          height: analyzeProfitHeight
        }, 0);

        $compare.animate({
          height: compareHeight
        }, 0);
      }
      // Tab switch resize container
      else {
        if(container === $dataSourcesConnect) {
          analyzeProfitHeight = $dataSourcesConnect.outerHeight();
          $analyzeProfit.animate({
            height: analyzeProfitHeight
          }, 0);
        }
        else {
          compareHeight = $dataSourcesComparison.outerHeight();
          $compare.animate({
            height: compareHeight
          }, 0);
        }
      }
    }

    $(window).resize(function(){
      changeHeight();
    });

  }

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