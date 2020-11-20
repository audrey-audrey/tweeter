//  * Client-side JS logic goes here
$(document).ready(function() {
  // Render two dummy tweets
  loadTweets(renderDummyTweets);

  // When user submits form: 
  $('form').on('submit', event => {
    // Prevent default
    event.preventDefault();

    // Serialize form to get data
    const tweet = $('form').serialize();
    const tweetLength = $('#tweet-text').val().length;

    // Validation
    if (tweetLength > 140) {
      warnUser('Oops!! Please keep tweet under 140 characters!');
    } else if (tweetLength <= 0) {
      warnUser('Oops!! The tweet cannot be empty!');
    } else {
      postTweet(tweet);
    }
  });
});
