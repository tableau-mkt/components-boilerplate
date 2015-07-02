/** 
 * Global gavigation interactions
 */
(function($){
  var $globalNav = $('.global-nav__top'),
      $menu = $globalNav.find('.global-nav__primary-menu'),
      $expandableLinks = $menu.find('li.expandable'),
      $drawers = $('.global-nav__drawers__drawer'),
      $hamburger = $globalNav.find('.hamburger'),
      $mobileWrapper = $globalNav.find('.global-nav__mobile-wrapper'),
      $mobileDrawerClose = $('.global-nav__drawers__drawer__close'),
      animation = {
        duration: 750,
        easing: "easeInOutQuart"
      };

  $(document).ready(function(){
    
    if (matchMedia('(min-width: 961px)').matches) {
      // Drawer Expanding interaction
      // @todo needs lots of work here.
      $expandableLinks.hover( 
        function() {
          openDrawer($(this));
        }, function() {
          var $link = $(this);
          $globalNav.find('a').not($link.find('a')).hover(function() {
            closeDrawer($link);
          });
        }
      );

      $drawers.click(function(e) {
        e.stopPropagation();
      });

      $(document).click(function() {
        closeDrawer($expandableLinks.filter('.expanded'));
      });
    }

    if (matchMedia('(max-width: 960px)').matches) {
      $expandableLinks.on('click.nav', function(e) {
        var $link = $(this),
            $drawer = $('#' + $link.data('drawer-id'));
        
        $drawer.show().addClass('open');

        $drawer.add($mobileWrapper).animate({
          marginLeft: '-=100%'
        }, animation);
       
        e.preventDefault();
      });
    }

    $mobileDrawerClose.on('click.nav', function(e) {
      var $drawer = $(this).closest('.global-nav__drawers__drawer');

      closeDrawerMobile($drawer);
      
      e.preventDefault();
    });

    // Mobile menu
    $hamburger.on('click.global-nav', function(e) {
      var $openDrawer = $drawers.filter('.open'),
          drawerOptions = $.extend({}, animation);

      if ($openDrawer.length) {
        drawerOptions.done = function() {
          $openDrawer.css('margin-left', '100%');
          $mobileWrapper.css('margin-left', '0%');
        };

        $openDrawer.slideUp(drawerOptions).removeClass('open');
      }

      $mobileWrapper.slideToggle(animation);
      $hamburger.parent().toggleClass('open');
      e.preventDefault();
    });


  });

  function openDrawer($link) {
    var $drawer = $drawers.filter('#' + $link.data('drawer-id'));

    $link.add($drawer).addClass('expanded');
    $drawers.filter('#' + $link.data('drawer-id')).slideDown(animation);
  }

  function closeDrawer($link) {
    var $drawer = $drawers.filter('#' + $link.data('drawer-id'));

    $link.add($drawer).removeClass('expanded');
    $drawers.filter('#' + $link.data('drawer-id')).slideUp(animation);
  }

  function closeDrawerMobile($drawer) {
    $drawer.add($mobileWrapper).animate({
      marginLeft: '+=100%'
    }, animation);

    setTimeout(function() {
      $drawer.hide().removeClass('open');
    }, animation.duration);
  }





  /***************************************************************************
  * HUGE Code below - @todo remove
  ***************************************************************************/

  // Nav event listeners
  // navigationSetup();

  // Product navigation functionality
  // productNavigationSetup();

  $(document).ready(function(){
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