const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(express.json()); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/quiz2', async (req, res) => {
    fs.readFile(path.join(__dirname, 'output.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let articles = JSON.parse(data).articles;
        res.json(articles);
    });
});

app.get('/quiz2/:number', async (req, res) => {
    fs.readFile(path.join(__dirname, 'output.json'), (err, data) => {
        if (err) {
            res.status(500).send('Error reading articles data');
            return;
        }
        let articles = JSON.parse(data).articles;
        if (title) {
            articles = articles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
        }
        res.json(articles);
    });
});

app.post('/quiz2', async (req, res) => {
    await fetchFromQuoteGarden(); 
    res.send('ETL pipeline executed');
});




app.put('/quiz2', async (req, res) => {
    try {
        const result = await quotesCollection.updateMany({}, { $set: req.body });
        res.send({ modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).send('Error updating quotes');
    }
});


app.put('/quiz2/:number', async (req, res) => {
    const id = parseInt(req.params.number);
    const updateResult = await quotesCollection.updateOne({ id: id }, { $set: req.body });
    
    if (updateResult.matchedCount === 0) {
        res.status(404).send({
            error: 'Not Found',
            message: 'Quote not found'
        });
    } else {
        res.send({ modifiedCount: updateResult.modifiedCount });
    }
});


app.delete('/quiz2', async (req, res) => {
    const deleteResult = await quotesCollection.deleteMany({});
    res.send({ deletedCount: deleteResult.deletedCount });
});

app.delete('/quiz2/:number', async (req, res) => {
    const id = parseInt(req.params.number);
    const deleteResult = await quotesCollection.deleteOne({ id: id });
    
    if (deleteResult.deletedCount === 0) {
        res.status(404).send('Quote not found');
    } else {
        res.send('Quote deleted');
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
