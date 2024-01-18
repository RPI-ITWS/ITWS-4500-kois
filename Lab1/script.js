let currentPage = 1;
let currentTickerIndex = 0;
const newsPerPage = 5;
const totalPage = 20;
const apiKey = 'a26b8f38a9e04a2cb821204b4c4a9285';
let newsData = [];

function fetchNews() {
    const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-16&sortBy=popularity&pageSize=${totalPage * newsPerPage}&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            newsData = data.articles;
            displayNews(); 
            updateNewsTicker(); 
            setInterval(updateNewsTicker, 10000); 
        });
}

function displayNews() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const start = (currentPage - 1) * newsPerPage;
    const end = start + newsPerPage;
    const pageArticles = newsData.slice(start, end);

    pageArticles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `<h2>${article.title}</h2><p>${article.description}</p>`;
        newsContainer.appendChild(div);
    });

    updateButtons();
}

function updateNewsTicker() {
    const newsTicker = document.getElementById('news-ticker');
    if (newsData.length > 0) {
        const article = newsData[currentTickerIndex % newsData.length];
        newsTicker.innerHTML = `<p>${article.title}</p>`;
        currentTickerIndex++;
    }
}

function updateButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    currentPage === 1 ? prevButton.style.display = 'none' : prevButton.style.display = 'block';
    currentPage === totalPage ? nextButton.style.display = 'none' : nextButton.style.display = 'block';
}

document.getElementById('prev-button').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        displayNews();
    }
});

document.getElementById('next-button').addEventListener('click', function() {
    if (currentPage < totalPage) {
        currentPage++;
        displayNews();
    }
});

fetchNews();
