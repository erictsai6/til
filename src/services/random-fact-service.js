var config = require('../config/config');
var cheerio = require('cheerio');
var q = require('q');
var request = require('request');

var randomFactService = {
    getRandomFact: function () {
        var deferred = q.defer();
        var url = 'http://randomfactgenerator.net/';

        request.get(url, function(err, response, body) {
            if (err) {
                deferred.reject({
                    message: 'Failed to retrieve random fact'
                });
            }
            var $ = cheerio.load(body);
            var allFacts = $('#z').text().split('\n');
            var fact = allFacts[0];

            deferred.resolve(fact);
        });

        return deferred.promise;
    }
};

module.exports = randomFactService;