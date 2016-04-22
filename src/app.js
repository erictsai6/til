var express = require('express');
var config = require('./config/config');
var logger = require('./utils/logger');
var http = require('http');
var bodyParser = require('body-parser');
var moment = require('moment');
var tumblrController = require('./controllers/tumblr-controller');

var app = express();

// all environments
app.set('port', config.port);
app.use(bodyParser.json())

app.post('/v1/hipchat', function(req, res) {

    var author = req.body.item.message.from.name;
    var message = req.body.item.message.message;
    var datetime = moment(req.body.item.message.date);

    tumblrController.hipchat(datetime, author, message)
        .then(function(hipchatMessage) {
            res.json(hipchatMessage);
        })
        .catch(function() {
            // Should never hit this
            logger.error('Should never hit, returning gracefully');
            res.status(500);
        });
});

app.get('/', function (req, res) {
    res.send('Health check');
});

http.createServer(app).listen(app.get('port'), function(){
    logger.info('TIL server listening on port %d!', config.port);
});