document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const newsContainer = document.getElementById('newsContainer');

    // Fetch news on page load
    fetchNews();

    // Fetch news based on selected category
    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        fetchNews(category);
    });

    function fetchNews(category = '') {
        let url = `http://localhost:8080/news`;  // Backend API endpoint

        if (category) {
            url += `?category=${category}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayNews(data.articles);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';  // Clear the container

        articles.forEach(article => {
            const newsCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                            <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.innerHTML += newsCard;
        });
    }
});
