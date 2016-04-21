var express = require('express');
var config = require('./config/config');
var Tumblr = require('tumblrwks');
var logger = require('./utils/logger');
var http = require('http');

var tumblr = new Tumblr({
  consumerKey: config.consumer_key,
  consumerSecret: config.consumer_secret,
  accessToken: config.token,
  accessSecret: config.token_secret
}, 'grubhub-umami.tumblr.com');

var app = express();

// all environments
app.set('port', config.port);

app.post('/v1/hipchat', function(req, res) {
    tumblr.post('/post', {
        type: 'text',
        title: 'tumblrwkstesting',
        body: '<h3>should work!! </h3>'
    })
    .then(function(json) {
        res.send();
    });
});

app.get('/', function (req, res) {
    res.send('Health check');
});

http.createServer(app).listen(app.get('port'), function(){
    logger.info('TIL server listening on port %d!', config.port);
});