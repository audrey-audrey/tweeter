// HELPER FUNCTIONS for client.js
// Dummy tweets => initial hardcoded data from /tweets
const renderDummyTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend($tweet);
  }
}

// RenderTweets function
const renderTweets = function (tweets) {
const tweet = tweets.pop()
const $tweet = createTweetElement(tweet);
$('#tweets-container').prepend($tweet);
}

// Escape function to escape unsafe characters
const escape = function (str) {
let div = document.createElement('div');
div.appendChild(document.createTextNode(str));
return div.innerHTML;
}

// CreateTweet function
const createTweetElement = function (tweet) {
let $tweet = `
<article class="tweet">
      <header>
        <div id="face-name">
          <img src=${escape(tweet.user.avatars)}>
          <p>${escape(tweet.user.name)}</p>
        </div>
        <div class="hide" id="handle"><p>${escape(tweet.user.handle)}</p></div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <span id="date"><p>${moment(tweet.content.created_at).fromNow()}</p></span>
        <span id="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
`
return $tweet;
}

// ajax fetch post (get) request
const loadTweets = (callback) => {
$.ajax({ url: '/tweets', method: 'GET' })
  .then((res) => {
    callback(res);
  })
}

// ajax post (post) request
const postTweet = (tweet) => {
$('.error-container').slideUp("fast", function () {
  // Animation complete.
});

// Clear text area
$("#tweet-text").val('')
$(".counter").val(140);
// post request
$.ajax({
  url: '/tweets',
  method: 'POST',
  data: tweet
})
  // fetch post request
  .then(() => {
    loadTweets(renderTweets);
  })
}

// warning error 
const warnUser = (message) => {
$('#error-message').text(message)
$('.error-container').slideDown("fast", function () {
  // Animation complete.
});
}
