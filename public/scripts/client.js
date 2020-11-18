// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */
// $(document).ready(function () {
//   // --- our code goes here ---
//   // Test / driver code (temporary). Eventually will get this from the server.
//   // Fake data taken from initial-tweets.json
//   const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd"
//       },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]

  // RenderTweets function
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  }

  // CreateTweet function
  const createTweetElement = function (tweet) {
    /* Your code for creating the tweet element */
    let $tweet = `
  <article class="tweet">
        <header>
          <div id="face-name">
            <img src=${tweet.user.avatars}>
            <p>${tweet.user.name}</p>
          </div>
          <div class="hide" id="handle"><p>${tweet.user.handle}</p></div>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <span id="date"><p>${tweet.created_at}</p></span>
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

//   renderTweets(data);

// });

$(document).ready(function () {

  $('form').on('submit', event => {
    event.preventDefault()
    console.log('Event prevented!')

    const tweetText = $('form').serialize();
    const tweetTextLength = tweetText.length - 5;

    if(tweetTextLength > 140) {
      return alert("Tweet is too long!");
    } else if (tweetTextLength <= 0){
      return alert("Tweet is too short!");
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: tweetText
      })
      .always(() => {
        console.log('Complete!', 
                  'tweet: ', tweetText, 
                  'tweet: ', tweetTextLength)
      })
    }
  })

  const loadTweets = () => {
    $.ajax({url: '/tweets', method: 'GET'})
    .then((res) => {
      renderTweets(res);
    })
  }

  loadTweets()

});
