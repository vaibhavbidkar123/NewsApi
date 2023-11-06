document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '68d0b002f6ff432f9a3e9c3d237ef0fc';
    const endpoint = 'https://newsapi.org/v2/top-headlines';
    const country = 'us';
    const apiUrl = `${endpoint}?country=${country}&apiKey=${apiKey}`;

    const sourceFilter = document.getElementById('source-filter');
    const cardContainer = document.getElementById('card-container');
    const sourceOptions = new Set(); // Using a Set to store unique source names
    let articles = []; // Declare articles in a scope that includes both fetch and filter functions

    function populateCards(articles) {
        cardContainer.innerHTML = ''; // Clear the card container

        articles.forEach((article, index) => {
            if (!sourceOptions.has(article.source.name)) {
                sourceOptions.add(article.source.name);

                const option = document.createElement('option');
                option.value = article.source.name;
                option.textContent = article.source.name;
                sourceFilter.appendChild(option);
            }
            console.log(article);
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h2>Article ${index}</h2>
                
                <p><strong>Source:</strong> ${article.source.name}</p>
                <p><strong>Title:</strong> ${article.title}</p>
                <p><strong>Description:</strong> ${article.description}</p>
                <p><strong>URL:</strong> <a href="${article.url}" target="_blank">Read More</a></p>
                <p><strong>Published At:</strong> ${article.publishedAt}</p>
                <p><strong>Content:</strong> ${article.content}</p>
                
            `;

            cardContainer.appendChild(card);
        });
    }

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            articles = data.articles; // Assign data to the articles variable
            populateCards(articles);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });

    sourceFilter.onchange = function() {
        const selectedValue = sourceFilter.value;
        filterArticlesBySource(selectedValue);
    };

    function filterArticlesBySource(selectedSource) {
        cardContainer.innerHTML = ''; // Clear the card container

        if (selectedSource === 'All Sources') {
            populateCards(articles);
        } else {
            const filteredArticles = articles.filter(article => article.source.name === selectedSource);
            populateCards(filteredArticles);
        }
    }
});
