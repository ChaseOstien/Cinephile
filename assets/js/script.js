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

    const imageElement = document.createElement('img');
    imageElement.src = article.mainImage.url;
    articleElement.appendChild(imageElement);
    imageElement.height=400;
    imageElement.width=400;
    imageElement.setAttribute('style','padding:10px; border-radius:20px;');

    const linkElement = document.createElement('a');
    linkElement.classList.add('button');
    linkElement.href = article.link;
    linkElement.textContent = 'Read More';
    articleElement.appendChild(linkElement);
    linkElement.setAttribute('style','color:blue')

    return articleElement;
}
document.addEventListener('DOMContentLoaded', fetchAndDisplayArticles);