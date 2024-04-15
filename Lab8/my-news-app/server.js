// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;
app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/articles', (req, res) => {
    fs.readFile(path.join(__dirname, 'articles.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let articles = JSON.parse(data).articles;
        res.json(articles);
    });
});

app.get('/api/articles/news', (req, res) => {
    const { title, page = 1, pageSize = 5 } = req.query;
    fs.readFile(path.join(__dirname, 'articles.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let articles = JSON.parse(data).articles;
        if (title) {
            articles = articles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize);
        const paginatedArticles = articles.slice(startIndex, endIndex);

        res.json(articles);
    });
});

app.post('/api/articles', (req, res) => {
    const newArticle = req.body; 

    fs.readFile(path.join(__dirname, 'articles.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        const fileData = JSON.parse(data);
        fileData.articles.push(newArticle); 

        fs.writeFile(path.join(__dirname, 'articles.json'), JSON.stringify(fileData, null, 2), err => {
            if (err) {
                res.status(500).send('Error saving new article');
                return;
            }
            res.status(201).send('Article added');
        });
    });
});

app.put('/api/articles', (req, res) => {
    const newData = req.body;
  
    const filePath = path.join(__dirname, 'articles.json');
  
    fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err); 
            return res.status(500).send('Error writing the JSON file.');
        }
        res.send('JSON file has been updated.');
    });
});

app.delete('/api/articles/news/source:id', (req, res) => {
    const articleTitle = req.params.source.id; 
    fs.readFile(path.join(__dirname, 'articles.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let fileData = JSON.parse(data);
        const articles = fileData.articles;
        const filteredArticles = articles.filter(article => article.source.id !== articleTitle);

        if (articles.length === filteredArticles.length) {
            res.status(404).send('Article not found');
            return;
        }

        fileData.articles = filteredArticles; 

        fs.writeFile(path.join(__dirname, 'articles.json'), JSON.stringify(fileData, null, 2), err => {
            if (err) {
                res.status(500).send('Error saving the updated articles data');
                return;
            }
            res.status(200).send('Article deleted');
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
