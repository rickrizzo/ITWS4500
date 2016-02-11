// Weekday and Date
var date = new Date();
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

// Get Weekday
function getWeekday(dayCode) {
  dayCode = dayCode % 7;
  return weekday[dayCode];
}

// Get Location Data
function getLocation() {
  if (navigator.geolocation) {
    loadingUI('Getting your weather');
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    messageUI('Geolocation not supported. Please upgrade your browser');
  }
}

// Display Location Data
function savePosition(position) {
  weatherUI();
  getWeather(position.coords.latitude, position.coords.longitude);
  getForecast(position.coords.latitude, position.coords.longitude);
}

// Get Weather
function getWeather(latitude, longitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=44db6a862fba0b067b1930da0d769e98',
    method: 'GET',
    dataType: 'jsonp',
    statusCode: {
      401: function() {
        messageUI('Check API Key');
      },
      404: function() {
        messageUI('Page not found');
      }
    }
  }).success(function(data) {
    console.log(data);
    $('header').append('<h1>Your Weather</h1>');
    $('header').append('<hr>');
    $('#today').append('<h3>Today\'s Forecast</h3>');
    $('#today').append('<h5>' + getWeekday(date.getDay()) + '</h5>')
    $('#today').append('<p>Your location: ' + data.name + '</p>');
    $('#today').append('<p>Current temperature: ' + data.main.temp + '&#8457</p>');
    $('#today').append('<p>Wind: ' + data.wind.speed + 'mph</p>');
    $('#today').append('<p>Clouds: ' + data.clouds.all + '%</p>');
    $('#today').append('<p>Humidity: ' + data.main.humidity + '%</p>');
  }).error(function() {
    console.log("An error occurred");
  });
}

// Get 5 Day Forecast
function getForecast(latitude, longitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=44db6a862fba0b067b1930da0d769e98&cnt=5',
    method: 'GET',
    dataType: 'jsonp',
    statusCode: {
      401: function() {
        messageUI('Check API Key');
      },
      404: function() {
        messageUI('Page not found');
      }
    }
  }).success(function(data) {
    console.log(data);
    $('#forecast').append('<h3>5 Day Forecast</h3>');
    $.each(data.list, function(index, value) {
      $('#forecast').append('<p>' + getWeekday(date.getDay() + index + 1) + ': ' + value.temp.day + '&#8457</p>');
    });
  }).error(function(error) {
    console.log("An error occurred");
    console.log(error);
  });
}

// Create UI
function loadingUI(message) {
  $('body').prepend('<main class="container"><h1 id="loading">' + message + '</h1></main>');
}
function weatherUI() {
  $('#loading').remove();
  $('main').append('<header></header><section id="today" class="col-md-6"></section><section id="forecast" class="col-md-6"></section>');
}

// Get Weather on Load
window.onload = getLocation();