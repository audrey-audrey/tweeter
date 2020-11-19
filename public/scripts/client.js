// HELPER FUNCTIONS
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
          <span id="date"><p>${escape(tweet.created_at)}</p></span>
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
