
// Get user input from the input field
var chosenCity = $("search-input").val();

// API URL
var queryURL = "https://api.openweathermap.org/data/2.5/forecast";

// My API key 
var APIKey = "746b435d2849d7f5790f34062361ed11";

// Construct the URL with user input and API key

var queryURLWithParam = queryURL + "?q=" + chosenCity + "&limit=1&appid=" + APIKey;
console.log(queryURLWithParam);

