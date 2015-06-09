/** 
 * Global gavigation interactions
 */
(function($){
  $(document).ready(function(){

    // Drawer Expanding interaction
    // @todo needs lots of work here.
    var $globalNav = $('.global-nav'),
        $menu = $globalNav.find('.global-nav__primary-menu'),
        $expandableLinks = $menu.find('li.expandable'),
        $drawer = $('.global-nav__drawer');

    $expandableLinks.hover( 
      function() {
        openDrawer(this);
      }, function() {
        $globalNav.find('a').not($(this).find('a')).hover(function() {
          closeDrawer();
        });
      }
    );

    function openDrawer(el) {
      $(el).addClass('expanded');
      $drawer.slideDown();
    }

    function closeDrawer() {
      $expandableLinks.removeClass('expanded');
      $drawer.slideUp();
    }

    $drawer.click(function(e) {
      e.stopPropagation();
    });

    $(document).click(function() {
      closeDrawer();
    });





    /***************************************************************************
    * HUGE Code below - @todo remove
    ***************************************************************************/

    // Nav event listeners
    // navigationSetup();

    // Product navigation functionality
    // productNavigationSetup();


    function navigationSetup() {
      var $hamburger = $('.hamburger'),
          $hamburgerClose = $('.hamburger-close'),
          $globalNav = $('.navigation-global').not('.navigation-global.small'),
          $globalNavSmall = $('.navigation-global.small'),
          $globalNavDropdown = $('.navigation-global-dropdown'),
          $globalNavDrawer = $('.sub-navigation-global-drawer').not('.sub-navigation-global-drawer.small'),
          $globalNavDrawerSmall = $('.sub-navigation-global-drawer.small'),
          $globalNavSmallContainer = $globalNavSmall.find('.navigation-global-container'),
          $productsBack = $globalNavSmall.find('.back'),
          $products = $globalNav.find('.products'),
          $productsSmall = $globalNavSmall.find('.products'),
          $productsArrow = $products.find('.arrow-up'),
          $header = $('header'),
          animationDuration = 300;

      // Global navigation expand/hide sub navigation in small
      $hamburger.on('click',function(e){
        e.preventDefault();

        $globalNavDropdown.add($globalNavSmall).addClass('expand');

        $hamburger.css({'display':'none'});
        $hamburgerClose.css({'display':'block'});

        $globalNavDropdown.slideDown(function(){
          // Reset productNav scrolling position
          resetProductNavigation();
        });

      });

      $hamburgerClose.on('click', function(e){
        e.preventDefault();

        $hamburger.css({'display':'block'});
        $hamburgerClose.css({'display':'none'});

        $globalNavDropdown.add($globalNavSmall).removeClass('expand');
        $globalNavDropdown.slideUp(function(){
          // Reset productNav scrolling position
          resetProductNavigation();
        });
      });

      // Product navigation large
      $products.hover(function(){
        productNavOpen();
      }, function(){
        $globalNav.find('li').not($products).add('main').hover(function() {
          productNavClose();
        });
      });


      function productNavOpen() {
        $globalNav.addClass('products-flyout');
        $globalNavDrawer.slideDown();
        $productsArrow.fadeIn();
      }

      function productNavClose() {
        $globalNav.removeClass('products-flyout');
        $globalNavDrawer.slideUp(function() {
          $productsArrow.fadeOut();
        });
      }

      // Product navigation small
      $productsSmall.on('click', function(e){
          e.preventDefault();
          e.stopPropagation();

          $globalNavSmallContainer.animate({
            'left':'-100%'
          }, animationDuration);
          $globalNavDrawerSmall.animate({
            'left':'0'
          }, animationDuration);

      });

      $productsBack.on('click', function(e){
        e.preventDefault();

        $globalNavSmallContainer.animate({
          'left':'0'
        }, animationDuration);
        $globalNavDrawerSmall.animate({
          'left':'100%'
        }, animationDuration);

      });

      $(window).resize(function(){
        if($(window).width() < mediumViewport) {
          productNavClose();
        }
      });
    }

    function productNavigationSetup() {
      var scroll,
          $productNav = $('.navigation-product-primary'),
          $productNavSmall = $('.navigation-product-body'),
          $productNavBtn = $('.navigation-product').find('.button'),
          $navProductLinks = $('.navigation-product-links'),
          productNavHeight = 0,
          stickySmall,
          sticky,
          navScrollComplete = true;

      function resetProductNavigation() {
        Waypoint.refreshAll();
        if($(window).width() <= smallViewport) {
          productNavHeight = $productNavSmall.height();
        }
        else {
          productNavHeight = $productNav.height();
        }
      }

      // On navigation link click scroll to content
      $productNav.add($productNavSmall).find('a').not('.button a').on('click',function(e){
        e.preventDefault();
        var waypointID = $(this).parent().attr('class').split(' ')[0];
        navScrollComplete = false;
        $('html,body').animate({
          scrollTop:$('#'+ waypointID).offset().top - productNavHeight
        },{
          complete: function() {
            navScrollComplete = true;
          }
        });
        updateNavigationHighlight(waypointID);
      });

      sticky = mainNav.waypoint(function(direction) {

        if (direction === 'up') {
          $productNav.removeClass('stuck');
          $productNavSmall.removeClass('stuck');
        }
        else {
          $productNav.addClass('stuck');
          $productNavSmall.addClass('stuck');
        }
      },{
        offset: function() {
          return -mainNav.height();
        }
      });


      var waypointsUp = $('.waypoint').waypoint(function(direction) {
        var elID =  this.element.id;
        if (navScrollComplete) {
          updateNavigationHighlight(elID, direction);
        }
      },{
        offset: '10%'
      });

      // Coordinate highlight section with nav link
      function updateNavigationHighlight(elID,direction) {
        // Remove highlights
        $productNav.add($productNavSmall).find('li').removeClass('active');

        var $elActive;

        if(direction === 'up' && (elID !== 'overview')) {
          $productNav.add($productNavSmall).find('li.'+elID+'').prev().addClass('active');
          $elActive = $('li.'+elID+'').prev();
        } else {
          $productNav.add($productNavSmall).find('li.'+elID+'').addClass('active');
          $elActive = $('li.'+elID+'');
        }


        // Move active link to first positon
        if($(window).width() <= smallViewport) {
          activeLinkPosition($elActive);
        }
      }

      function activeLinkPosition($elActive) {
        var $prevLinks = $productNavSmall.find($elActive).prevAll(),
            marginLeft = 0;

        $prevLinks.each(function() {
          marginLeft += $(this).outerWidth();
        });

        $navProductLinks.scrollLeft(marginLeft);
      }

      // Onload
      resetProductNavigation();

      // Recalculate on resize
      $(window).on('resize', function() {
        // Trigger scroll to update nav
        $(window).scroll();
        resetProductNavigation();
      });

      $productNavBtn.on('click', function(e){
        e.preventDefault();

        if($(window).width() <= mediumViewport) {
          $('html, body').animate({
            scrollTop: $('footer').offset().top
          }, 500);
        }
      });
    }

    function resetProductNavigation() {
      mainNavPosition = mainNav.offset();
      mainNavHeight = mainNav.height();
      mainNavScrollDistance = mainNavPosition.top + mainNavHeight;
    }

  });
})(jQuery);