// HELPER FUNCTIONS
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
const loadTweets = () => {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then((res) => {
      renderTweets(res);
    })
}

// ajax post (post) request
const postTweet = (tweet) => {
  $('.error-container').slideUp("fast", function () {
    // Animation complete.
  });
  $("#tweet-text").val('')
  // post request

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: tweet
  })
    // fetch post request
    .then(() => {
      loadTweets();
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
  // Compose new tweet!
  $('.compose').on('click', event => {
    // Toggle new-tweet container up or down
    $('.new-tweet').slideToggle("fast", function () {
      // Animation complete.
    });
    // Focus on textarea so user can type right away
    $('#tweet-text').focus();
  })

  // Tweet form!
  $('form').on('submit', event => {
    event.preventDefault()
    console.log('Tweet submitted!')

    const tweetText = $('form').serialize();
    const tweetTextLength = $('#tweet-text').val().length;

    // Validation
    if (tweetTextLength > 140) {
      warnUser('Too long! Please limit tweet characters to 140!');
    } else if (tweetTextLength <= 0) {
      warnUser('The tweet cannot be empty!');
    } else {
      postTweet(tweetText);
    }

  })

});
