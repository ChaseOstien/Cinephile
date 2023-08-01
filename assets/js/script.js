let currentPage = 1;
const articlesPerPage = 6;
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');

async function fetchAndDisplayArticles(page,perPage) {
    const url = 'https://flixster.p.rapidapi.com/news/list';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f86b1736f2msh8e554cb4e67e76fp1e6530jsn0e9c049ba3ce',
            'X-RapidAPI-Host': 'flixster.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const articlesContainer = document.getElementById('articles-container');

        /*let count = 0;
        // Loop through the articles and create the article elements to append to the container
        data.data.newsStories.forEach(article => {
                if (count < 3) {
                    const articleElement = createArticleElement(article);
                    articlesContainer.appendChild(articleElement);
                    count++;
                } else {
                    return;
                }
            
        });*/
        // Calculate the starting and ending index for the current page
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const section1 = document.getElementById("section-1");
        // Clear the previous articles from the container
        articlesContainer.innerHTML = '';

        //section1.appendChild(backButton)
        //section1.appendChild(nextButton)

        // Loop through the articles and create the article elements to append to the container
        for (let i = startIndex; i < endIndex && i < data.data.newsStories.length; i++) {
            const article = data.data.newsStories[i];
            const articleElement = createArticleElement(article);
            articlesContainer.appendChild(articleElement);
        }
    } catch (error) {
        console.error(error);
    }
}
// Helper function to create an article element
function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.setAttribute('style','display: flex; flex-direction: row; justify-content: center; align-items: center; padding:25px; flex-wrap: wrap; width: 500px; min-height: 430px; border: 1px solid black; border-radius: 20px; margin: 10px;');

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = article.title;
    articleElement.appendChild(titleElement);
    titleElement.setAttribute('style','color:black','')
    titleElement.classList.add('subtitle', 'is-4');

    const imageElement = document.createElement('img');
    imageElement.src = article.mainImage.url;
    articleElement.appendChild(imageElement);
    imageElement.height=400;
    imageElement.width=400;
    imageElement.setAttribute('style','margin:10px; border-radius:20px; border: solid; border-color: black;');

    const linkElement = document.createElement('a');
    linkElement.classList.add('button', 'is-focused', 'is-dark');
    linkElement.href = article.link;
    linkElement.textContent = 'Read More';
    articleElement.appendChild(linkElement);
    linkElement.setAttribute('style','is-danger')
    
    return articleElement;
}

//Variable declarations for availablilty to following functions. 
var submitButton = document.getElementById('submitButton');
var imgContainer = document.getElementById('img-Container');
var textContainer = document.getElementById('text-Container');
var plotContainer = document.getElementById('plot-container');
var movieBox = document.getElementById('movie-box');

//Function to call OMDB API and generate movie info in the movie box section. This section is hidden until function is called and content is generated. 
async function movieSearch() {
    var requestUrl = new URL ('https://www.omdbapi.com/?apikey=e9184d9c&t=&y=&plot=full');
    var str1 = document.getElementById('movie-name').value;
    const movieName = str1.charAt(0).toUpperCase() + str1.slice(1);
    var releaseYear = document.getElementById('release-year').value;
    const alertModal = document.createElement('div');
    var search_Params = requestUrl.searchParams;
    var search_Params2 = requestUrl.searchParams
    search_Params.set('t', movieName);
    search_Params2.set('y', releaseYear);
    const omdbSection = document.getElementById('OMDB');

    str1.required = true;
    
    imgContainer.innerHTML = '';
    textContainer.innerHTML = '';
    plotContainer.innerHTML = '';
    
    

    
    //if statement for modal or required box for Movie name input. 
    if (movieName === '') {
        
        /*alertModal.setAttribute('id', 'modalContainer');
        alertModal.classList.add('modal');
        
        submitButton.setAttribute('data-target', 'submitButton');

        const modalBackground = document.createElement('div');
        modalBackground.classList.add('modal-background', 'is-primary');


        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content', 'is-primary');
        const modalText = document.createTextNode('Enter a movie name!')
        modalContent.appendChild(modalText);

        const closeButton = document.createElement('button');
        closeButton.classList.add('modal-close', 'is-large');
        closeButton.setAttribute('aria-label', 'close');

        alertModal.appendChild(modalBackground);
        alertModal.appendChild(modalContent);
        alertModal.appendChild(closeButton);

        submitButton.appendChild(alertModal);

    document.addEventListener('DOMContentLoadedcon', () => {
        function openModal (alertModal) {
            alertModal.classList.add('is-active');
        }
        function closeModal() {
            alertModal.classList.remove('is-active');
        }

        //document.addEventListener('click', closeModal);
    })*/
} 
    //Array to hold movie objects. 
    var movieSearches = [];

    try {
        //code to render the movie content called from OMDB. 
        const response = await fetch(requestUrl);
            const data = await response.json();
            console.log(data);

            omdbSection.setAttribute('style', 'display:flex');
            var movieImg = document.createElement('img');
            
            movieImg.setAttribute('id', 'poster');
            //movieImg.classList.add('image');
            movieImg.src = data.Poster;
            movieImg.height = 444;
            movieImg.width = 300;
            console.log(data.Poster);
            imgContainer.append(movieImg);
            poster.setAttribute('style','border: 2px solid black;');

            var movieTitle = document.createElement('h2');
            movieTitle.classList.add('title', 'is-2', 'is-spaced');
            movieTitle.textContent = data.Title;
            textContainer.appendChild(movieTitle);
            movieTitle.setAttribute('style', 'color:black');

            var release_year = document.createElement('h3');
            release_year.classList.add('subtitle', 'is-3');
            release_year.textContent = 'Release Year: ' + data.Year;
            textContainer.appendChild(release_year);
            release_year.setAttribute('style', 'color:black');
            
            var genre = document.createElement('h3');
            genre.classList.add('subtitle', 'is-3');
            genre.textContent = 'Genre: ' + data.Genre;
            textContainer.appendChild(genre);
            genre.setAttribute('style', 'color:black');

            var cast = document.createElement('h3');
            cast.classList.add('subtitle', 'is-3');
            cast.textContent = 'Cast: ' + data.Actors;
            textContainer.appendChild(cast);
            cast.setAttribute('style', 'color:black');

            var runtime = document.createElement('h3');
            runtime.classList.add('subtitle', 'is-3', 'is-spaced');
            runtime.textContent = 'Runtime: ' + data.Runtime;
            textContainer.appendChild(runtime);
            runtime.setAttribute('style', 'color:black');

            var plotTitle = document.createElement('h3');
            plotTitle.classList.add('subtitle', 'is-3');
            plotTitle.textContent = 'Movie Plot: ';
            textContainer.appendChild(plotTitle);
            plotTitle.setAttribute('style', 'color:black');


            var plot = document.createElement('h4');
            plot.classList.add('subtitle', 'is-4');
            plot.textContent = data.Plot;
            plotContainer.appendChild(plot);
            plot.setAttribute('style', 'color:black');
            plotContainer.setAttribute('style', 'border-top:1px solid black; padding:12px');
        
        
        var movieItem = {
            movieImg: movieImg.src,
            movieTitle: movieTitle.textContent,
            release_year: release_year.textContent,
            genre: genre.textContent,
            cast: cast.textContent,
            runtime: runtime.textContent,
            plotTitle: plotTitle.textContent,
            plot: plot.textContent,
        };
        //code to push rendered content into local storage array. 
        movieSearches.push(movieItem);
        saveData(movieName, movieSearches);


    } catch(error) {
    console.log('Error fetching data', error)
}
//code to generate the history buttons for each movie input and event listener for loadData function. 
searchHistory = document.getElementById('search-History');
historyButton = document.createElement('button');
//code to capitalize first letter of movie name input. 
const str = movieName;
const str2 = str.charAt(0).toUpperCase() + str.slice(1);

historyButton.textContent = str2;
historyButton.classList.add('button', 'is-dark', 'is-focused');
historyButton.setAttribute('style', 'padding:10px; margin:7px');
searchHistory.appendChild(historyButton);
historyButton.addEventListener('click', async function () {
    
    loadData(movieName);
    
});

}
//function to load previously rendered content when history buttons are clicked. 
function loadData (movieName) {

    const savedData = JSON.parse(localStorage.getItem('Movie-Searches'));
    console.log(savedData);

        


    for (const movie in savedData) {

        imgContainer.innerHTML = '';
        textContainer.innerHTML = '';
        plotContainer.innerHTML = '';
    
        const movieData = savedData[movieName].data[0];

        

        const movieImg = document.createElement('img');
        movieImg.setAttribute('id', 'poster');
        movieImg.height = 444;
        movieImg.width = 300;
        
        
        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('title', 'is-2', 'is-spaced');
        movieTitle.setAttribute('style', 'color:black');

        const release_year = document.createElement('h3');
        release_year.classList.add('subtitle', 'is-3');
        release_year.setAttribute('style', 'color:black');

        const genre = document.createElement('h3');
        genre.classList.add('subtitle', 'is-3');
        genre.setAttribute('style', 'color:black');

        const cast = document.createElement('h3');
        cast.classList.add('subtitle', 'is-3');
        cast.setAttribute('style', 'color:black');

        const runtime = document.createElement('h3');
        runtime.classList.add('subtitle', 'is-3', 'is-spaced');
        runtime.setAttribute('style', 'color:black');

        const plotTitle = document.createElement('h3');
        plotTitle.classList.add('subtitle', 'is-3');
        plotTitle.setAttribute('style', 'color:black');

        const plot = document.createElement('h4');
        plot.classList.add('subtitle', 'is-4');
        plot.setAttribute('style', 'color:black');
        plotContainer.setAttribute('style', 'border-top:1px solid black; padding:12px');

        const str = movieName;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        


        movieTitle.textContent = movieData.movieTitle;
        release_year.textContent = movieData.release_year;
        movieImg.src = movieData.movieImg;
        genre.textContent = movieData.genre;
        cast.textContent = movieData.cast;
        runtime.textContent = movieData.runtime;
        plotTitle.textContent = movieData.plotTitle;
        plot.textContent = movieData.plot;

        

        imgContainer.append(movieImg);
        textContainer.appendChild(movieTitle);
        textContainer.appendChild(release_year);
        textContainer.appendChild(genre);
        textContainer.appendChild(cast);
        textContainer.appendChild(runtime);
        textContainer.appendChild(plotTitle);
        plotContainer.appendChild(plot);

        

        } 
    } 

//function delcaration for locak storage. 
function saveData (movieName, data) {
    const savedData = JSON.parse(localStorage.getItem('Movie-Searches')) || {};
    savedData[movieName] = { movieName: movieName, data: data };
    localStorage.setItem('Movie-Searches', JSON.stringify(savedData));
}

//event listener for Search button. 
submitButton.addEventListener('click', movieSearch);

document.addEventListener('DOMContentLoaded', () => {
    // Initially fetch and display the first page of articles
    fetchAndDisplayArticles(currentPage, articlesPerPage);

    // Add event listener to the "Next" button
    
    nextButton.addEventListener('click', () => {
        // Increment the current page and fetch the next set of articles
        currentPage++;
        fetchAndDisplayArticles(currentPage, articlesPerPage);
    });



    // Add event listener to the "Back" button
    
    backButton.addEventListener('click', () => {
        // Check if the current page is greater than 1 to prevent going back below page 1
        if (currentPage > 1) {
            // Decrement the current page and fetch the previous set of articles
            currentPage--;
            fetchAndDisplayArticles(currentPage, articlesPerPage);
        }
    });
});

