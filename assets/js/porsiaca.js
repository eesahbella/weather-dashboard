

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
    function constructQueryForecastURL (){
    
        // Get user input from the input field
        var chosenCity = $("#search-input").val();
        
        // API URL
        var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast";
        
        // My API key 
        var APIKey = "746b435d2849d7f5790f34062361ed11";
        
        // Construct the URL with user input and API key
        
        var queryForecastURLWithParam = queryForecastURL + "?q=" + chosenCity + "&limit=5&appid=" + APIKey;
        console.log(queryForecastURLWithParam);
        
        return queryForecastURLWithParam;
        }
    
    
    
    //click event
    $("#search-button").on("click", function(event) {
        event.preventDefault();
    
        //FOR CURRENT WEATHER
    
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
        var cardWeatherContent =
        `<h2>${cityName}</h2>
        <p>Date: ${date.toLocaleDateString()}</p>
        <p>Temperature: ${temperature.toFixed(0)}°C</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>`;
    
        $('#chosen-city-weather').html(cardWeatherContent);
    
        });  
        
    
        //FOR 5 DAY FORECAST
    
        
    
        for (var i = 0; i < queryURLForecast.length; i++) {
    
            var queryURLForecast = constructQueryForecastURL();
    
            fetch(queryURLForecast)
            .then(function (response) {
            return response.json();
            })
            .then(function (weatherData) {
    
            var date = new Date(weatherData.dt * 1000);
            var weatherDescription = weatherData.weather[0].description;
            var iconCode = weatherData.weather[0].icon;
            var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
            var temperature = weatherData.main.temp - 273.15;
            var humidity = weatherData.main.humidity;
    
            var cardForecastContent = 
            `<p>Date: ${date.toLocaleDateString()}</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="${iconUrl}" alt="Weather Icon" style="width: 50px; height: 50px;">
            <p>Temperature: ${temperature.toFixed(0)}°C</p>
            <p>Humidity: ${humidity}%</p>`;
    
            $('#forecast-' + (i + 1)).html(cardForecastContent);
    
        })
    }
    });