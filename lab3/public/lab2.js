let currentPage = 1;
let currentTickerIndex = 0;
const newsPerPage = 5;
const totalPage = 21;
let newsData = [];

function fetchNews(page = 1, pageSize = 105) { 
    const url = `/api/articles?page=${page}&pageSize=${pageSize}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        newsData = data || [];
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
        div.innerHTML = `
        <p>ID: ${article.source.id || "Unknown ID"}</p>
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        ${article.url ? `<a href="${article.url}" target="_blank">Learn More</a>` : ''}
        `;
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
/*Lab 2 part */
function generateRandomId() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

function fetchSpecificNews() {
    const title = document.getElementById('searchTitle').value;
    fetch(`/api/articles/news?title=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(articles => {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = ''; 
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                <a>ID:${article.source.id || "Can't edit"}</a>
                <p>${article.title}</p>
                ${article.url ? `<a href="${article.url}" target="_blank">Learn More</a>` : ''}
                `;
                resultsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching specific news:', error));
        
}


document.getElementById('addArticleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('articleTitle').value;
    const description = document.getElementById('articleDescription').value;

    const articleData = {
        source: { id: generateRandomId(), name: "User Submitted" }, 
        author: "Anonymous", 
        title: title,
        description: description,
        url: "", 
        urlToImage: "", 
        publishedAt: new Date().toISOString(), 
        content: "" 
    };

    fetch('/api/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); 
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    alert("Successfully added")
});

function deleteArticle(id) {
    console.log('Received ID:', id); 

    if (!id) {
        console.error('Invalid ID:', id);
        return;
    }

    console.log('Deleting article with ID:', id);
    
    fetch(`/api/articles/${encodeURIComponent(id)}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log('Article deleted successfully');
            return response.text(); 
        } else {
            throw new Error('Failed to delete the article');
        }
    })
    .then(data => {
        console.log('Delete confirmation:', data);
    })
    .catch(error => console.error('Error:', error));
}

function deleteArticleFromInput() {
    const id = document.getElementById('article-id').value; 
    if (id) { 
        deleteArticle(id); 
        alert("Successfully deleted")
    } else {
        console.error('No ID provided');
    }
}

fetchNews();
