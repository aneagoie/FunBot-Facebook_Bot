var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World! I am the FunBot!');
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'funbottoken') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'funbottoken') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!');
});