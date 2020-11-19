$(document).ready(function () {
  // STRETCH ACTIVITY
  // Compose new tweet!
  $('.compose').on('click', event => {
    // Toggle new-tweet container up or down
    $('.new-tweet').slideToggle("fast", function () {
      // Animation complete.
    });
    // Focus on textarea so user can type right away
    $('#tweet-text').focus();
  })

  // Scroll to top of page!
  // if scroll down, show button

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      // #scroll-button = scroll button ID
      // .compose = write a new tweet button ID
      $('#scroll-button:hidden').stop(true, true).fadeIn();
      $('.compose').fadeOut()
    } else {
      $('#scroll-button').stop(true, true).fadeOut();
      $('.compose').fadeIn()
    }
  });

  // When button is clicked, scroll to top
  $("#scroll-button").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});
