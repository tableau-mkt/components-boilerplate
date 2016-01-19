// On styleguide, simulate basic paging ability.
jQuery(function ($) {
  var $pageLinks = $('.pager__page, .pager__endcap');
  $pageLinks.find('a').click(function () {
    $pageLinks.removeClass('pager__page--current pager__endcap--current');
    $(this).parent().addClass('pager__page--current');
    return false;
  });
});
