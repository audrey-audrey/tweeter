// jQuery!

$(document).ready(function() {
  // --- our code goes here ---
  // console.log(document);

  // event handler for form in new-tweet section
  $('#tweet-text').on('input', function() {

    console.log(140 - $(this).val().length)
  })

});