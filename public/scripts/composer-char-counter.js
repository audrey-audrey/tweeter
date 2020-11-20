// Character count!
$(document).ready(function() {
  $('.new-tweet').on('input', function() {
    const tweetLength = $(this).find('#tweet-text').val().length;
    const remainingChar = 140 - tweetLength;

    const counter = $(this).find(".counter");
    // Override the text with remainingChar
    counter.text(remainingChar);
  
    // if remainingchar is negative, the tweet is too long!
    if (remainingChar < 0) {
      counter.addClass("tweetTooLong");
    } else {
      counter.removeClass("tweetTooLong");
    }
  });
});