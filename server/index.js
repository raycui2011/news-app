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
const API_SERVICE_URL = "https://content.guardianapis.com/search?&api-key=" + apiKey;
const cors = require('cors');
app.use(cors())
// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});



app.get('/search', function(req, res){
    
    request.get(API_SERVICE_URL, function (error, response, body) {

        if (!error && response.statusCode == 200) {
          console.log(error); // Print the body of the response. If it's not there, check the response obj
          //do all your magical stuff here
        }
        const resultSet = JSON.parse(response.body);
        console.log(resultSet.response.results);
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

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
}));


// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});