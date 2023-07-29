async function fetchAndDisplayArticles() {
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

        let count = 0;
        // Loop through the articles and create the article elements to append to the container
        data.data.newsStories.forEach(article => {
                if (count < 3) {
                    const articleElement = createArticleElement(article);
                    articlesContainer.appendChild(articleElement);
                    count++;
                } else {
                    return;
                }
            
        });
    } catch (error) {
        console.error(error);
    }
}
// Helper function to create an article element
function createArticleElement(article) {
    const articleElement = document.createElement('article');
    articleElement.setAttribute('style','display: flex; flex-direction: column; justify-content: center; align-items: center; padding:10px;');

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
    imageElement.setAttribute('style','padding:10px; border-radius:20px;');

    const linkElement = document.createElement('a');
    linkElement.classList.add('button', 'is-focused', 'is-dark');
    linkElement.href = article.link;
    linkElement.textContent = 'Read More';
    articleElement.appendChild(linkElement);
    linkElement.setAttribute('style','is-danger')

    return articleElement;
}

var submitButton = document.getElementById('submitButton');


async function movieSearch() {
    var requestUrl = new URL ('http://www.omdbapi.com/?apikey=e9184d9c&t=&y=&plot=full');
    var movieName = document.getElementById('movie-name').value;
    var releaseYear = document.getElementById('release-year').value;
    const alertModal = document.createElement('div');
    var search_Params = requestUrl.searchParams;
    var search_Params2 = requestUrl.searchParams
    search_Params.set('t', movieName);
    search_Params2.set('y', releaseYear);
    var movieBox = document.getElementById('movie-box');
    var imgContainer = document.getElementById('img-Container');
    var textContainer = document.getElementById('text-Container');
    var plotContainer = document.getElementById('plot-container');
    imgContainer.innerHTML = '';
    textContainer.innerHTML = '';
    plotContainer.innerHTML = '';

    

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
    


    try {
        
        const response = await fetch(requestUrl);
            const data = await response.json();
            console.log(data);

            
            var movieImg = document.createElement('img');
            
            movieImg.setAttribute('id', 'poster');
            //movieImg.classList.add('image');
            movieImg.src = data.Poster;
            movieImg.height = 444;
            movieImg.width = 300;
            console.log(data.Poster);
            imgContainer.append(movieImg);

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
            




    } catch(error) {
    console.log('Error fetching data', error)
}
}



submitButton.addEventListener('click', movieSearch);




document.addEventListener('DOMContentLoaded', fetchAndDisplayArticles);