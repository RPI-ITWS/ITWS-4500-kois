// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const apiKey = "ff32ef96e13a598c8668c6353b80e1e3";
app.use(express.json()); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.get('/api/articles/:id', (req, res) => {
    const articleId = req.params.id; 

    fs.readFile(path.join(__dirname, 'articles.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        const articles = JSON.parse(data).articles;
        const article = articles.find(article => article.source.id === articleId);

        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article not found');
        }
    });
});

/*Lab3 part */

app.get('/weather/:cityName', (req, res) => {
    
    var city = req.params.cityName; 

    var weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
    var mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBap6hHqVZtXGgmTgYXdUcYMtvucDmH7nY`;

    fetch(weatherURL)
    .then((weatherResp) => {
        if (!weatherResp.ok) {
            res.status(500);
            res.json({ 'message': 'I was not able to fetch that weather :(' });
        } else {
            console.log("Weather response received");
            return weatherResp.json();
        }
    }) 
    .then((weatherData) => {
        
        fetch(mapURL)
        .then((mapResp) => {
            if (!mapResp.ok) {
                res.status(500);
                res.json({ 'message': 'I was not able to fetch the map :(' });
            } else {
                return mapResp.json();
            }
        })
        .then((mapJSON) => {
            res.json(Object.assign(weatherData, mapJSON)); 
        });
    });
});
app.use(express.static('public'));

app.get('/getHistory', (req, res) => {
    const filePath = path.join(__dirname, 'weatherHistory.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read history file:', err);
            res.status(500).send('Failed to read history file.');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.post('/addHistory', (req, res) => {
    const { cityName, weatherData } = req.body;
    const temp = weatherData.main.temp * 1.8 - 459.67
    const id = crypto.randomUUID();
    const historyEntry = {
        id,
        cityName,
        country: weatherData.sys.country,
        weather: weatherData.weather[0].main, 
        temperature: temp.toFixed(2) + '°F',
        description: weatherData.weather[0].description,
        timestamp: new Date().toISOString(),
        coord: weatherData.coord
    };

    const filePath = path.join(__dirname, 'weatherHistory.json');

    fs.readFile(filePath, (err, data) => {
        let history = { records: [] };

        if (!err) {
            history = JSON.parse(data.toString());
        }

        history.records.push(historyEntry);

        fs.writeFile(filePath, JSON.stringify(history, null, 2), writeErr => {
            if (writeErr) {
                console.error('Failed to update history file.', writeErr);
                return res.status(500).send('Failed to update history file.');
            }
            res.status(201).send('History record added successfully.');
        });
    });
});

app.delete('/deleteHistory', (req, res) => {
    const historyFilePath = path.join(__dirname, 'weatherHistory.json');

    fs.unlink(historyFilePath, err => {
        if (err) {
            console.error('Failed to delete history file:', err);
            return res.status(500).send('Failed to delete history file.');
        }
        res.send('History file deleted successfully.');
    });
});
/*Lab3 end */



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

app.delete('/api/articles/:id', (req, res) => {
    const articleId = req.params.id; 

    fs.readFile(path.join(__dirname, 'articles.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let articlesData = JSON.parse(data);
        let articles = articlesData.articles; 

        const articleIndex = articles.findIndex(article => article.source.id === articleId);

        if (articleIndex === -1) {
            res.status(404).send('Article not found');
            return;
        }

        articles.splice(articleIndex, 1);

        fs.writeFile(path.join(__dirname, 'articles.json'), JSON.stringify({ articles: articles }, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing articles data');
                return;
            }
            res.status(204).send(); 
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
