// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// RenderTweets function
const renderTweets = function (tweets) {
  // empty the section first
  // $('#tweets-container').empty()

  // // loops through tweets
  // for (const tweet of tweets) {
  //   // calls createTweetElement for each tweet
  //   const $tweet = createTweetElement(tweet);
  //   // takes return value and appends it to the tweets container
  //   $('#tweets-container').prepend($tweet);
  // }

  // alternatively (but this one doesn't show the dummy data)
  const tweet = tweets.pop()
  const $tweet = createTweetElement(tweet);
  $('#tweets-container').prepend($tweet);
}

// Escape function to escape unsafe characters
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// CreateTweet function
const createTweetElement = function (tweet) {
  /* Your code for creating the tweet element */
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

// ajax fetch post request
const loadTweets = () => {
  $.ajax({ url: '/tweets', method: 'GET' })
    .then((res) => {
      renderTweets(res);
    })
}

$(document).ready(function () {

  $('form').on('submit', event => {
    event.preventDefault()
    console.log('Event prevented!')

    const tweetText = $('form').serialize();
    const tweetTextLength = $('#tweet-text').val().length;

    // ajax post request
    if (tweetTextLength > 140) {
      $('#error-message').text('Too long! Please limit tweet characters to 140!')
      $('.error-container').slideDown( "slow", function() {
        // Animation complete.
      });
    } else if (tweetTextLength <= 0) {
      $('#error-message').text('The tweet cannot be empty!')
      $('.error-container').slideDown( "slow", function() {
        // Animation complete.
      });
    } else {
      $('.error-container').slideUp( "slow", function() {
        // Animation complete.
      });
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: tweetText
      })
        // fetch post request
        .then(() => loadTweets())
        .always(() => {
          console.log('Complete!',
            'tweet: ', tweetText,
            'length: ', tweetTextLength)
        })
    }

  })

});
