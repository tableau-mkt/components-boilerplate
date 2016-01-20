/**
 * Topic Navigation interaction
 * Requires jquery.contentReveal.js and jquery.tabs.js
 */

// Loose augmentation pattern. Creates top-level Components variable if it
// doesn't already exist.
var Components = Components || {};

// Declare this component's namespace.
Components.topicNav = {};

/**
 * Topic Navigation DOM-ready callback.
 */
Components.topicNav.init = function ($) {
  // Tabs integration
  $('.topic-nav__tabs a').tabs({
    contents: $('.topic-nav__drawer'),
    wrapper: $('.topic-nav')
  });

  // contentReveal interaction
  $('.topic-nav__drawers').contentReveal({
    triggers: $('.topic-nav__toggle'),
    closeLink: false
  });

  // Custom tweaks
  $('.topic-nav__toggle').on('click.topic-nav', function (e) {
    var $parentNav = $(this).closest('.topic-nav');

    if ($(this).data('revealState') === 'open') {
      $parentNav.find('.topic-nav__tabs a').eq(0).trigger('click').addClass('is-active');
    }
    else {
      $parentNav.find('.topic-nav__tabs a').removeClass('is-active');
    }
  });

  $('.topic-nav__tabs a').on('click.topic-nav', function (e) {
    var $toggle = $(this).closest('.topic-nav').find('.topic-nav__toggle');

    if ($toggle.data('revealState') === 'closed') {
      $toggle.trigger('click.reveal');
    }
  });

  // Set active tab to topic query param on DOM-ready.
  Components.topicNav.setActiveTab(Components.utils.getUrlParams().topic);
};

/**
 * Set the active tab.
 *
 * @param {String} topic ID
 *
 * @return {Boolean} whether matching content was found on the page.
 */
Components.topicNav.setActiveTab = function (topic) {
  var $matchingContent = $('[data-tab-content="' + topic + '"]');

  // Trigger a click on any matching elements.
  $matchingContent.click();

  return $matchingContent.length > 0;
};

// Bind DOM-ready callback.
$(document).ready(Components.topicNav.init);
