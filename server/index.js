const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();
const request = require('request');


// Configuration
const PORT = 3000;
const HOST = "localhost";
const apiKey = 'cd556b20-eb0d-460f-b5da-4bd0db1be5d5';
const API_SERVICE_URL = "https://content.guardianapis.com/search";
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

app.post('/search', function(req, res){    
    const term = req.body.term;
    const page = req.body.page;
    const apiUrl = API_SERVICE_URL + '?q=' + term + '&page=' + page + '&api-key=' + apiKey;
    request.get(apiUrl, function (error, response, body) {
        if (error && response.statusCode != 200) {
            res.status(500).send('Something broke!');
        }
        const resultSet = JSON.parse(response.body);
        res.json(resultSet.response.results);
    })
 })

app.get('/search', function(req, res){
    const term  = req.query.term;
    const page = req.query.page;
    const apiUrl = API_SERVICE_URL + '?q=' + term + '&page=' + page + '&api-key=' + apiKey;
    request.get(apiUrl, function (error, response, body) {
        if (error && response.statusCode != 200) {
            res.status(500).send('Something broke!');
        }
        const resultSet = JSON.parse(response.body);
        res.json(resultSet.response.results);
    })
 })

// Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
});



// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});