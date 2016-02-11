// Tweet Creator
function tweet(num, picture, text) {
  var id  = '<li id="tweet' + num + '" class="row">',
  pic     = '<img class="img-circle col-sx-3" src="' + picture + '">',
  txt     = '<p class="col-sx-9">' + text + '</p></li>';
  var tweet = id + pic + txt;
  return tweet;
}

// Get JSON
$.getJSON("tweetsFromTwitter.json", function (data) {
  
  // Ticker
  ticker(0);

  // Ticker Implementation
  function ticker (i) {
    // Variables
    var time = 0;

    // Set Up Ticker
    if (i === 0) {
      $('body').prepend('<main><h1>Tweet Ticker</h1><section id="tweets" class="container"><ul></ul></section></main>');
    }

    // Handle First Five
    if(i >= 5) {
      time = 3000;
    }

    // Timer
    setTimeout(function() {
      $('#tweet' + (i-5)).slideUp('normal', function() { $(this).remove(); });
      $('#tweets ul').append(tweet(i, data[i].user.profile_image_url, data[i].text)).show('slow');
      $('#tweet' + i).css('background-color', '#' + data[i].user.profile_background_color);
      i++;
      if(i < data.length) {
        ticker(i);
      }
    }, time);

    // Fix Images
    $('img').error(function () {
      $(this).attr('src', 'egg.png');
    });

    // Rich Tweets
    $('p:last').html(function() {

      // Text
      var text = $('p:last').html();

      // Regular Expressions
      var urlRegex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      var userRegex = /(^|[^@\w])@(\w{1,15})\b/ig;
      var hashRegex = /(^|\s)(#[a-z\d-]+)/ig;

      // URL Parser  
      text = text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
      });

      // Twitter Mention
      text = text.replace(userRegex, function(url) {
        return '<a href="https://twitter.com/' + url.substring(1) + '">' + url + '</a>';
      });

      // Hash Tag
      text = text.replace(hashRegex, function(url) {
        return '<a href="https://twitter.com/search?q=%23' + url.substring(1) + '">' + url + '</a>';
      });

      // Return
      return text;
    });
  };
});