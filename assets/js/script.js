var cityArray = [];

// construct the WEATHER query URL for making an API request
function constructQueryWeatherURL() {
  // Get user input from the input field
  var chosenCity = $("#search-input").val();

  // API URL
  var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather";

  // My API key
  var APIKey = "746b435d2849d7f5790f34062361ed11";

  // Construct the URL with user input and API key

  var queryWeatherURLWithParam =
    queryWeatherURL + "?q=" + chosenCity + "&limit=1&appid=" + APIKey;
  console.log(queryWeatherURLWithParam);

  return queryWeatherURLWithParam;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// construct the FORECAST query URL for making an API request
function constructQueryForecastURL() {
  // Get user input from the input field
  var chosenCity = $("#search-input").val();

  // API URL
  var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast";

  // My API key
  var APIKey = "746b435d2849d7f5790f34062361ed11";

  // Construct the URL with user input and API key

  var queryForecastURLWithParam =
    queryForecastURL + "?q=" + chosenCity + "&limit=5&appid=" + APIKey;
  console.log(queryForecastURLWithParam);

  return queryForecastURLWithParam;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

var cityHistory = [];

// SEARCH BUTTON CLICK EVENT --------------------------------------------------------------------------------------------------------------------------------------------------------
$("#search-button").on("click", function (event) {
  event.preventDefault();

  // Get user input from the input field
  var chosenCity = $("#search-input").val();
  // Add the chosen city to the history
  cityHistory.push(chosenCity);
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  renderCityHistory();

  //FOR CURRENT WEATHER -----------------------------------------------------------------

  var queryURLWeather = constructQueryWeatherURL();

  fetch(queryURLWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      // Log the resulting object
      console.log(weatherData);

      // Extracting relevant information from the weatherData
      var cityName = weatherData.name;
      var temperature = weatherData.main.temp - 273.15;
      var weatherDescription = weatherData.weather[0].description;
      var iconCode = weatherData.weather[0].icon;
      var windSpeed = weatherData.wind.speed;
      var humidity = weatherData.main.humidity;

      // Convert timestamp (dt) to a readable date
      var date = new Date(weatherData.dt * 1000); // Convert to milliseconds

      // Construct the URL for the weather icon
      var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      // Updating HTML
      var cardWeatherContent = `<h2>${cityName}</h2>
    <p>Date: ${date.toLocaleDateString()}</p>
    <p>Temperature: ${temperature.toFixed(0)}°C</p>
    <p>Weather: ${weatherDescription}</p>
    <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Humidity: ${humidity}%</p>`;

      $("#chosen-city-weather").html(cardWeatherContent);
    });

  //FOR 5 DAY FORECAST -------------------------------------------------------------------

  var queryURLForecast = constructQueryForecastURL();

  fetch(queryURLForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      // Log the resulting object
      console.log(forecastData);

      // Iterate over the forecast data for each day
      for (var i = 0; i < forecastData.list.length; i += 8) {
        var forecast = forecastData.list[i];

        // Extract relevant information from the forecast data
        var date = new Date(forecast.dt * 1000);
        var weatherDescription = forecast.weather[0].description;
        var iconCode = forecast.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        var temperature = forecast.main.temp - 273.15;
        var humidity = forecast.main.humidity;

        // Construct the HTML content for each forecast day
        var cardForecastContent = `<p>Date: ${date.toLocaleDateString()}</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
        <p>Temperature: ${temperature.toFixed(0)}°C</p>
        <p>Humidity: ${humidity}%</p>`;

        // Insert the forecast content into the corresponding HTML element
        $("#forecast-" + (i / 8 + 1)).html(cardForecastContent);
      }
      //-------------END OF SEARCH BUTTON CLICK EVENT------------------------------------------------------------------------------------------------------------------------------

      
    });
});

// HISTORY SPECIFIC CITIES BUTTON CLICK EVENT -----------------------------------------------------------------------------------------------------------------------------
$("#history").on("click", ".city-button", function () {
  var selectedCity = $(this).text();
  // Call a function to display weather info for the selected city
  displayCityWeatherInfo(selectedCity);
});
//END OF SPECIFIC CITIES BUTTON CLICK EVENT -------------------------------------------------------------------------------------------------------------------------------

// Function for displaying the city weather info ---------------------------------------------------------------------------------------------------------------------------
function displayCityWeatherInfo(selectedCity) {
  // construct the WEATHER query URL for making an API request
  function constructQueryWeatherURL(city) {
    // API URL
    var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather";
    // My API key
    var APIKey = "746b435d2849d7f5790f34062361ed11";
    // Construct the URL with user input and API key
    var queryWeatherURLWithParam =
      queryWeatherURL + "?q=" + city + "&limit=1&appid=" + APIKey;
    return queryWeatherURLWithParam;
  }

  // construct the FORECAST query URL for making an API request
  function constructQueryForecastURL(city) {
    // API URL
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast";
    // My API key
    var APIKey = "746b435d2849d7f5790f34062361ed11";
    // Construct the URL with user input and API key
    var queryForecastURLWithParam =
      queryForecastURL + "?q=" + city + "&limit=5&appid=" + APIKey;
    return queryForecastURLWithParam;
  }

  //to display CURRENT WEATHER info ---------------------------------------------
  var queryURLWeather = constructQueryWeatherURL(selectedCity);

  fetch(queryURLWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      // Log the resulting object
      console.log(weatherData);

      // Extracting relevant information from the weatherData
      var cityName = weatherData.name;
      var temperature = weatherData.main.temp - 273.15;
      var weatherDescription = weatherData.weather[0].description;
      var iconCode = weatherData.weather[0].icon;
      var windSpeed = weatherData.wind.speed;
      var humidity = weatherData.main.humidity;

      // Convert timestamp (dt) to a readable date
      var date = new Date(weatherData.dt * 1000); // Convert to milliseconds

      // Construct the URL for the weather icon
      var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

      // Updating HTML
      var cardWeatherContent = `<h2>${cityName}</h2>
            <p>Date: ${date.toLocaleDateString()}</p>
            <p>Temperature: ${temperature.toFixed(0)}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Humidity: ${humidity}%</p>`;

      $("#chosen-city-weather").html(cardWeatherContent);
    });

  //to display 5 DAY FORECAST info -------------------------------------------------------
  var queryURLForecast = constructQueryForecastURL(selectedCity);

  fetch(queryURLForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      // Log the resulting object
      console.log(forecastData);

      // Iterate over the forecast data for each day
      for (var i = 0; i < forecastData.list.length; i += 8) {
        var forecast = forecastData.list[i];

        // Extract relevant information from the forecast data
        var date = new Date(forecast.dt * 1000);
        var weatherDescription = forecast.weather[0].description;
        var iconCode = forecast.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        var temperature = forecast.main.temp - 273.15;
        var humidity = forecast.main.humidity;

        // Construct the HTML content for each forecast day
        var cardForecastContent = `<p>Date: ${date.toLocaleDateString()}</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
            <p>Temperature: ${temperature.toFixed(0)}°C</p>
            <p>Humidity: ${humidity}%</p>`;

        // Insert the forecast content into the corresponding HTML element
        $("#forecast-" + (i / 8 + 1)).html(cardForecastContent);
      }
    });
}
// END OF FUNCTION for displaying the city weather info -----------------------------------------------------------------------------------------------------------------------
function renderCityHistory (){
    cityHistory = JSON.parse(localStorage.getItem("cityHistory"));

      // Deleting the buttons prior to adding new ones
      $("#history").empty();

      // Create and append buttons for each city in the history
      for (var j = 0; j < cityHistory.length; j++) {
        var cityButton = $("<button>");
        cityButton.addClass("city-button mb-3 btn btn-success");
        cityButton.text(cityHistory[j]);
        $("#history").append(cityButton);
      }
}
renderCityHistory();

// Saving into local storage--------------------------------------------------------------------------------------------------------------------------------------------------
$("#search-button").on("click", function () {});
