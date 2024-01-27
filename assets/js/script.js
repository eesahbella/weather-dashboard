

// construct the WEATHER query URL for making an API request
function constructQueryWeatherURL (){

// Get user input from the input field
var chosenCity = $("#search-input").val();

// API URL
var queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather";

// My API key 
var APIKey = "746b435d2849d7f5790f34062361ed11";

// Construct the URL with user input and API key

var queryWeatherURLWithParam = queryWeatherURL + "?q=" + chosenCity + "&limit=1&appid=" + APIKey;
console.log(queryWeatherURLWithParam);

return queryWeatherURLWithParam;
}

// construct the FORECAST query URL for making an API request
function constructqueryForecastURL (){

    // Get user input from the input field
    var chosenCity = $("#search-input").val();
    
    // API URL
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast";
    
    // My API key 
    var APIKey = "746b435d2849d7f5790f34062361ed11";
    
    // Construct the URL with user input and API key
    
    var queryForecastURLWithParam = queryForecastURL + "?q=" + chosenCity + "&limit=1&appid=" + APIKey;
    console.log(queryForecastURLWithParam);
    
    return queryForecastURLWithParam;
    }



//click event
$("#search-button").on("click", function(event) {
    event.preventDefault();

    var queryURLWeather = constructQueryWeatherURL();

    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (weatherData) {

    // Log the resulting object
    console.log(weatherData);

   // Extracting relevant information from the weatherData
    var cityName = weatherData.name;
    var temperature = weatherData.main.temp;
    var weatherDescription = weatherData.weather[0].description;
    var windSpeed = weatherData.wind.speed;
    var humidity = weatherData.main.humidity;

    // Updating HTML
    var cardContent =
    `<h2>${cityName}</h2>
    <p>Temperature: ${temperature} K</p>
    <p>Weather: ${weatherDescription}</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Humidity: ${humidity}%</p>`;

    $('#chosen-city-weather').html(cardContent);

    });    
});