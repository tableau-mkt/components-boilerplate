/**
 * Components Utility Functions
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.utils = {};

// Breakpoint values.
Components.utils.breakpoints = {
  'mobileMax': 639,
  'tabletMin': 640,
  'tabletMax': 960,
  'desktopMin': 961,
  'contentMax': 1550,
  'layoutMax': 1920
};

/**
 * Smooth Scroll to top of an element
 * @param  {jQuery Object} $element - Element to scroll to the top of
 * @param  {integer} duration       - Length of the animation
 * @param  {integer} offset         - Any offset to account for sticky elements
 * @param  {boolean} onlyUp         - Whether scroll should only happen if the scroll direction is up
 */
Components.utils.smoothScrollTop = function ($element, duration, offset, onlyUp) {
  duration = duration || 500;
  offset = offset || 0;
  onlyUp = onlyUp || false;

  var elementTop = $element.offset().top,
      pageTop = $(window).scrollTop(),
      scroll = !onlyUp;

  if (onlyUp && pageTop > elementTop) {
    scroll = true;
  }

  if (scroll) {
    $('body, html').animate({
      scrollTop: elementTop - offset
    }, duration);
  }
};

/**
 * Get parsed URL params, with caching.
 *
 * @return {Object} URL Params
 */
Components.utils.getUrlParams = function () {
  var urlParams = Components.utils.parseUrlParams;
  // Return the cached result, or on cache miss, the result of the invoked
  // function, assigned to the cache property of this Function object.
  return urlParams.cache || (urlParams.cache = urlParams());
};

/**
 * Get parsed URL params.
 *
 * @return {Object} URL Params
 */
Components.utils.parseUrlParams = function () {
  var result = {},
    match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
    query = window.location.search.substring(1);

  while ((match = search.exec(query)) !== null) {
    result[decode(match[1])] = decode(match[2]);
  }

  return result;
};


/**
 * Helpers to identify which breakpoint the browser is in.
 *
 * @return {Boolean} whether viewport is within specified breakpoint
 */
Components.utils.isMobile = function () {
  return matchMedia('(max-width: ' + Components.utils.breakpoints.mobileMax + 'px)').matches;
};

Components.utils.isTablet = function () {
  return matchMedia('(min-width:' + Components.utils.breakpoints.tabletMin + 'px) and (max-width: ' + Components.utils.breakpoints.tabletMax + 'px)').matches;
};

Components.utils.isDesktop = function () {
  return matchMedia('(min-width: ' + Components.utils.breakpoints.desktopMin + 'px)').matches;
};
