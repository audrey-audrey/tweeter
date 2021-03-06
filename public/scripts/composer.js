// STRETCH ACTIVITY
$(document).ready(function() {
  // Compose new tweet!
  $('.compose').on('click', event => {
    // Toggle new-tweet container up or down
    $('.new-tweet').slideToggle("fast");
    // Focus on textarea so user can type right away
    $('#tweet-text').focus();
  });

  // Scroll to top of page!
  // if scroll down, show button
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      // #scroll-button => scroll button ID
      $('#scroll-button:hidden').stop(true, true).fadeIn();
      // .compose => compose button class
      $('.compose').fadeOut("fast");
    } else {
      $('#scroll-button').stop(true, true).fadeOut();
      $('.compose').fadeIn("fast");
    }
  });

  // When button is clicked, scroll to top
  $("#scroll-button").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});
