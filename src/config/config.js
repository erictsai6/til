var environment = process.env.ENVIRONMENT || 'development';


module.exports = {
    port: 3000,

    consumer_key: process.env.TIL_OAUTH_CONSUMER_KEY,
    consumer_secret: process.env.TIL_OAUTH_CONSUMER_SECRET,
    token: process.env.TIL_OAUTH_TOKEN,
    token_secret: process.env.TIL_OAUTH_TOKEN_SECRET

};