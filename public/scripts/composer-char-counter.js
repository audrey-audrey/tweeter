// jQuery!

$(document).ready(function() {
  // --- our code goes here ---

  // event handler for form in new-tweet section

  $('.new-tweet').on('input', function () {
    const tweetLength = $(this).find('#tweet-text').val().length;
    const remainingChar = 140 - tweetLength;

    // Alternatively, const counter = $(this).children().children().find(".counter")
    const counter = $(this).find(".counter")
    // Override the text with remainingChar
    counter.text(remainingChar)
  
    // if remainingchar is less than 0, add another class
    if(remainingChar < 0) {
      counter.addClass("tweetTooLong");
    } else {
      counter.removeClass("tweetTooLong")
    }
  })


});