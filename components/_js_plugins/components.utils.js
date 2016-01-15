/**
 * Components Utility Functions
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.utils = {};

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
  var result,
    match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  result = {};
  while ((match = search.exec(query)) !== null) {
    result[decode(match[1])] = decode(match[2]);
  }

  return result;
};
