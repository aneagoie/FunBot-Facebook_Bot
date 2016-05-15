var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var token = 'EAAIbFiOeJBcBAERNppvdEyMBFkyeLc5475SRnM7HOztLNc92VBsnvhQmFHIgQGxmQMgunpeyMQ7jOI2CPjrPsO2zoSg7Y2DZBnp6jvHsBPNMmm4DvyJZBBnYBSgnO6qumq1EHbZAZBiZBjqrBItjrYbyZAPbrHEqBUQHGLrxA9NwZDZD';

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error)
    } else if (response.body.error) {
      console.log('Error: ', response.body.error)
    }
  })
}

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World! I am the FunBot!');
});

app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i]
    sender = event.sender.id
    if (event.message && event.message.text) {
      text = event.message.text
      console.log(text);
      sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
    }
  }
  res.sendStatus(200)
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});