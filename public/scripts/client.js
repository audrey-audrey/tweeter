// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

$(document).ready(function () {
  // Render two dummy tweets 
  loadTweets(renderDummyTweets);

  // Tweet form!
  $('form').on('submit', event => {
    event.preventDefault()
    console.log('Tweet submitted!')

    const tweet = $('form').serialize();
    const tweetTextLength = $('#tweet-text').val().length;

    // Validation
    if (tweetTextLength > 140) {
      warnUser('Too long! Please limit tweet characters to 140!');
    } else if (tweetTextLength <= 0) {
      warnUser('The tweet cannot be empty!');
    } else {
      postTweet(tweet);
    }
  })
});
