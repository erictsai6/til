var express = require('express');
var config = require('./config/config');
var Tumblr = require('tumblrwks');
var logger = require('./utils/logger');
var http = require('http');
var bodyParser = require('body-parser');
var moment = require('moment');

var tumblr = new Tumblr({
  consumerKey: config.consumer_key,
  consumerSecret: config.consumer_secret,
  accessToken: config.token,
  accessSecret: config.token_secret
}, 'grubhub-umami.tumblr.com');

var app = express();

// all environments
app.set('port', config.port);
app.use(bodyParser.json())

app.post('/v1/hipchat', function(req, res) {


    var author = req.body.item.message.from.name;
    var message = req.body.item.message.message;
    var datetime = moment(req.body.item.message.date);

    tumblr.post('/post', {
        type: 'text',
        title: datetime.format('ddd, MMM DD YYYY'),
        body: author + ': ' + message
    }, function(err, json) {
        if (err) {
            console.log(err);
            res.json({
                "color": "yellow",
                "message": "TIL failed to upload your entry",
                "notify": true,
                "message_format": "text"
            });
        } else {
            res.json({
                "color": "green",
                "message": "TIL thanks you for your contribution",
                "notify": false,
                "message_format": "text"
            });
        }
    });
});

app.get('/', function (req, res) {
    res.send('Health check');
});

http.createServer(app).listen(app.get('port'), function(){
    logger.info('TIL server listening on port %d!', config.port);
});