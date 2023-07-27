async function fetchAndDisplayArticles() {
    const url = 'https://flixster.p.rapidapi.com/news/list';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c48d143b66msh6a6e77b93d1ddd0p132e84jsn2c5243fa1c06',
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
                if (count < 6) {
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

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = article.title;
    articleElement.appendChild(titleElement);

    const imageElement = document.createElement('img');
    imageElement.src = article.mainImage.url;
    articleElement.appendChild(imageElement);
    imageElement.height=100;
    imageElement.width=150;

    const linkElement = document.createElement('a');
    linkElement.href = article.link;
    linkElement.textContent = 'Read More';
    articleElement.appendChild(linkElement);

    return articleElement;
}


async function movieSearch() {
    var requestUrl = new URL ('http://www.omdbapi.com/?apikey=e9184d9c&t=&plot=full');
    var movieName = document.getElementById('movie-name').value;

    var search_Params = requestUrl.searchParams;
    search_Params.set('t', movieName);

    


}




document.addEventListener('DOMContentLoaded', fetchAndDisplayArticles);