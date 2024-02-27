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

app.get('/quiz', (req, res) => {

    var URL = `https://www.boredapi.com/api/`;
    fetch(URL)
    .then((URLResp) => {
        if (!URLResp.ok) {
            res.status(500);
            res.json({ 'message': 'No good :(' });
        } else {
            return URLResp.json();
        }
    }) 
    .then((data) => {
        res.json(Object.assign(data)); 
    });
});

app.get('/quiz/activity', (req, res) => {

    var URL = `https://www.boredapi.com/api/activity`;
    fetch(URL)
    .then((URLResp) => {
        if (!URLResp.ok) {
            res.status(500);
            res.json({ 'message': 'No good :(' });
        } else {
            return URLResp.json();
        }
    }) 
    .then((data) => {
        res.json(Object.assign(data)); 
    });
});

app.get('/quiz/activity/:price', (req, res) => {
    const price = req.params.price;

    var URL = `https://www.boredapi.com/api/activity?price=${price}`;
    fetch(URL)
    .then((URLResp) => {
        if (!URLResp.ok) {
            res.status(500);
            res.json({ 'message': 'No good :(' });
        } else {
            return URLResp.json();
        }
    }) 
    .then((data) => {
        res.json(Object.assign(data)); 
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
