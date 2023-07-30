// Open Movie Database API key:
var omdbApiKey = "879f97e4";

// Lower right-hand side of app where details about movie will go:
var movieDetails = document.getElementById("movie-details");
// console.log(movieDetails);

// Search button where user enters the movie they are interested in:
var searchButton = document.querySelector(".button");
// console.log(searchButton);

// Function attached to button that calls the movie image:
function movieImageApi () {
    
    "http://img.omdbapi.com/?apikey=" + omdbApiKey + "&" + movieTitle
}

// Event listener for movie search button:
searchButton.addEventListener("click", function () {
    movieImageApi();
})

