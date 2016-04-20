var express = require('express');
var config = require('./config/config');
var tumblr = require('tumblr');
var logger = require('./utils/logger');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(config.port, function () {
    logger.info('TIL server listening on port 3000!');
});