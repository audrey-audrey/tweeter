//  * Client-side JS logic goes here
$(document).ready(function() {
  // Render two dummy tweets when page is loaded
  loadTweets(renderDummyTweets);

  // When user submits form: 
  $('form').on('submit', event => {
    event.preventDefault();

    // Serialize form to get data
    const tweet = $('form').serialize();
    const tweetLength = $('#tweet-text').val().length;

    // Validate character length
    if (tweetLength > 140) {
      warnUser('Oops!! Please keep tweet under 140 characters!');
    } else if (tweetLength <= 0) {
      warnUser('Oops!! Tweet cannot be empty!');
    } else {
      postTweet(tweet);
    }
  });
});
