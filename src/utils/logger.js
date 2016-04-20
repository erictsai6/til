var winston = require('winston');
var config = require('../config/config');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'til-access.log' })
    ]
});

module.exports = logger;