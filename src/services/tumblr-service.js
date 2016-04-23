var config = require('../config/config');
var Tumblr = require('tumblrwks');
var q = require('q');

var tumblr = new Tumblr({
        consumerKey: config.consumer_key,
        consumerSecret: config.consumer_secret,
        accessToken: config.token,
        accessSecret: config.token_secret
    }, 'grubhub-umami.tumblr.com');

var tumblrService = {
    getPosts: function() {
        var deferred = q.defer();

        tumblr.get('/posts', {
            limit: 2,
            filter: 'text'
        }, function (err, json) {
            if (err) {
                deferred.reject({
                    message: 'Failed to retrieve posts'
                });
            }
            deferred.resolve(json.posts);
        });

        return deferred.promise;
    },
    createPost: function(title, post, fact) {
        var deferred = q.defer();

        var body = '';
        if (fact) {
            body = '(TIL) Random fact: ' + fact + '\n\n';
        }
        body += post;

        tumblr.post('/post', {
            type: 'text',
            title: title,
            body: body
        }, function (err, json) {
            if (err) {
                deferred.reject({
                    message: 'Failed to create post'
                });
            }
            deferred.resolve(json);
        });

        return deferred.promise;
    },
    editPost: function (id, originalPost, appendPost) {
        var deferred = q.defer();

        var post = originalPost + '\n\n' + appendPost;

        tumblr.post('/post/edit', {
            id: id,
            body: post
        }, function (err, json) {
            if (err) {
                deferred.reject({
                    message: 'Failed to update post'
                });
            }
            deferred.resolve(json);
        });

        return deferred.promise;
    }
};

module.exports = tumblrService;