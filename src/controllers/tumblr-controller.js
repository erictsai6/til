var tumblrService = require('../services/tumblr-service');
var logger = require('../utils/logger');
var q = require('q');

function hipchatMessageResponse(message, color, notify, messageFormat) {
    return {
        message: message,
        color: color || 'green',
        notify: notify || false,
        message_format: messageFormat || 'text'
    };
}

function validateHipchat(message) {
    var errors = [];

    if (message.indexOf('/til') !== 0) {
        errors.push('Invalid format: you must start with /til to register');
    }

    return errors;
}

var tumblrController = {
    hipchat: function (datetime, author, message) {

        var errors = validateHipchat(message);
        if (errors.length > 0) {
            // Only return the most recent one
            return q.when(hipchatMessageResponse(errors[0], 'yellow'));
        }

        var title = datetime.format('ddd, MMM DD YYYY');
        var body = author + ': ' + message;

        return tumblrService.getPosts()
            .then(function(posts) {
                for (var i = 0; i < posts.length; i++) {
                    var post = posts[i];
                    if (post.title.indexOf(title) > -1) {
                        return tumblrService.editPost(post.id, post.body, body);
                    }
                }
                return tumblrService.createPost(title, body);
            })
            .then(function(json) {
                return hipchatMessageResponse('Success!  Visit http://grubhub-umami.tumblr.com/');
            })
            .catch(function(err) {
                logger.error(err.message);
                return hipchatMessageResponse('Failed to upload your TIL', 'red');
            });
    }
}

module.exports = tumblrController;